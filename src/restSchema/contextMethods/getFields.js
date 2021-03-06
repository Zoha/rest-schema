const deepmerge = require("deepmerge")
const isArray = require("../helpers/isArray")
const isObject = require("../helpers/isObject")
const types = require("../types")
const filter = require("../helpers/filter")
const CustomType = require("../customType")
const isFunction = require("../helpers/isFunction")
const isPlainObject = require("is-plain-object")

/**
 * @typedef {import("../../../typeDefs/context").resource} resource
 */

/**
 * @typedef {import("../../../typeDefs/context").context} context
 */

/**
 * @typedef {import("../../../typeDefs/field").fields} fields
 */

/**
 *
 * @param {fields} argFields
 * @param {context} context
 * @param {string} [prepend]
 * @returns
 */
const formatFields = async (argFields, context, prepend = "") => {
  const defaultField = context.defaults.defaultField
  let fields = argFields
  if (!fields) {
    return {}
  }

  // if fields is function call the function
  if (typeof fields === "function") {
    fields = await fields(context)
  }

  // if list of fields is not object
  // because formatField will be used recursively
  const formattedFields = isObject(fields) ? {} : []

  const operationOnEachField = async fieldKey => {
    let field = fields[fieldKey]
    // if field is false so ignore it
    // this is useful for removing default fields
    if (typeof field === "boolean" && field === false) {
      return
    }
    // if field type is function
    // then call the function for getting
    // field type or field nested value
    if (
      !Object.values(types).includes(field) &&
      !Object.keys(types).includes(field) &&
      typeof field === "function"
    ) {
      field = await field(context)
    }

    if (
      (!isObject(field) ||
        (field.type == null &&
          field.required == null &&
          field.creatable == null &&
          field.updatable == null &&
          field.set == null &&
          field.get == null)) &&
      !(field instanceof CustomType)
    ) {
      // if type of field is not object by default
      // like message : String -> so convert it
      // to an object with type that equals to value
      field = {
        type: field
      }
    }

    // define field key
    field.key = fieldKey
    field.nestedKey = prepend + fieldKey
    field.uniqueKey = Math.random()
      .toString(36)
      .substring(7)

    // deep merge field values with default field values
    // @ts-ignore
    field = deepmerge(defaultField, field, { isMergeableObject: isPlainObject })

    // if field is array nested
    // change type to Array and
    // process fields as children
    if (isArray(field.type)) {
      field.children = field.type
      field.isNested = true
      field.isArrayNested = true
      field.type = Array
    }

    // if field is object nested
    // change type to Object and
    // process fields as children
    else if (isObject(field.type) && !(field.type instanceof CustomType)) {
      field.children = field.type
      field.isNested = true
      field.isObjectNested = true
      field.type = Object
    }

    // if type of field was map create a valid field for its key
    if (field.type === Map) {
      const ofField = await formatFields(
        {
          "{keyName}": field.of
        },
        context,
        `${prepend + fieldKey}.`
      )
      field.of = ofField["{keyName}"]
    }

    // if field is nested then process the children
    if (field.children) {
      if (!field.children && field.isArrayNested) {
        field.children = []
      } else {
        field.children = await formatFields(field.children, context, `${prepend + fieldKey}.`)
      }
    }

    // if type of field is custom type
    // apply field options for it
    if (field.type instanceof CustomType) {
      field = {
        ...field,
        ...(isFunction(field.type.getFieldOptions)
          ? await field.type.getFieldOptions(context, field)
          : {})
      }
    }

    // if parent is an array push to parent array
    // else set parent property
    if (isObject(fields)) {
      formattedFields[fieldKey] = field
    } else {
      formattedFields.push(field)
    }
  }

  // process each field and format it
  const operationOnEachFieldPromises = []
  const fieldKeys = Object.keys(fields)
  for (let fieldKeyIndex = 0; fieldKeyIndex < fieldKeys.length; fieldKeyIndex += 1) {
    const fieldKey = fieldKeys[fieldKeyIndex]
    operationOnEachFieldPromises.push(operationOnEachField(fieldKey))
  }

  // execute operations
  await Promise.all(operationOnEachFieldPromises)
  return filter(formattedFields, i => i != null)
}

/**
 * @this context
 * @param {object} [args]
 * @param {boolean} [args.setFields]
 * @param {fields} [args.fields]
 * @returns {Promise.<fields>}
 */
module.exports = async function({ setFields = true, fields = undefined } = {}) {
  const context = this
  if (fields !== undefined && !fields) {
    return null
  }
  fields = fields || context.schema.fields
  const formattedFields = await formatFields(fields, context)
  if (setFields) {
    context.fields = formattedFields
  }
  return formattedFields
}
