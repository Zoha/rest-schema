const isArray = require("../helpers/isArray")
const isObject = require("../helpers/isObject")
const isFunction = require("../helpers/isFunction")
const filter = require("../helpers/filter")
const addToFieldsArrayAsLengthOfValues = require("../helpers/addToFieldsArrayAsLengthOfInputs")
const createMapFieldsFromInput = require("../helpers/createMapFieldsFromInput")

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
 * @param {object} values
 * @param {context} context
 * @param {resource} originalResource
 * @returns {Promise<*>}
 */
const getValues = async (argFields, values, context, originalResource) => {
  if (!argFields) {
    return isArray(values) ? [] : {}
  }
  // define object for final results
  let result = {}
  // if target should be array
  if (isArray(argFields)) {
    result = []
  }

  // if type of fields are array
  // and count of fields are lower that values
  // add fields item to equal length of the values
  const fields = addToFieldsArrayAsLengthOfValues(argFields, values)

  const executeLoopOperation = async fieldKey => {
    // define field and value
    const field = fields[fieldKey]

    let value = context.cast(values[fieldKey]).to(field.type || String)

    // if value have no value (undefined or null)
    // and field has a default property
    // get the default value for

    if (value == null && field.default != null) {
      let defaultValue = field.default
      if (isObject(defaultValue)) {
        defaultValue = field.default[context.route]
      }
      if (defaultValue != null) {
        if (isFunction(defaultValue)) {
          value = await defaultValue({
            ...context,
            resource: originalResource
          })
        } else {
          value = defaultValue
        }
      }
    }

    // if value have a get
    // or is an object that has get
    // then get value by the get function or get value
    if (field.get) {
      let { get } = field
      if (isObject(get)) {
        get = field.get[context.route]
      }
      if (get) {
        if (isFunction(get) && (value != null || (!field.creatable && !field.updatable))) {
          value = await get(value, {
            ...context,
            resource: originalResource
          })
        } else if (!isFunction(get)) {
          value = get
        }
      }
    }

    // process map type
    if (field.type === Map && field.of) {
      field.type = Object
      field.isNested = true
      field.isObjectNested = true
      field.children = createMapFieldsFromInput(field.of, value)
    }

    // if value was get and not equals to null or undefined
    // process the nested values for the field
    if (value != null && field.isNested && (isObject(value) || isArray(value))) {
      value = await getValues(field.children, value, context, originalResource)
    }

    // add to final result
    result[fieldKey] = value
  }

  const operations = []
  // process each field
  const fieldKeys = Object.keys(fields)
  for (let fieldKeyIndex = 0; fieldKeyIndex < fieldKeys.length; fieldKeyIndex += 1) {
    const fieldKey = fieldKeys[fieldKeyIndex]
    operations.push(executeLoopOperation(fieldKey))
  }
  // execute operations
  await Promise.all(operations)

  return filter(result, i => i != null)
}

/**
 * @this context
 * @param {object} [args]
 * @param {fields} [args.fields]
 * @param {resource} [args.resource]
 * @param {fields} [args.selectFields]
 * @returns {Promise.<object>}
 */
module.exports = async function({ fields = null, resource = null, selectFields = null } = {}) {
  const context = this
  fields =
    (fields && (await context.getFields({ fields, setFields: false }))) ||
    context.fields ||
    (await context.getFields())

  resource = resource || context.resource || (await context.getResource())
  selectFields =
    selectFields || (await context.getSelectFields({ fields: fields, resource: resource }))
  return getValues(selectFields, resource, context, resource)
}
