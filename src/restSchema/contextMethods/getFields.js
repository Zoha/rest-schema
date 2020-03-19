const isArray = require('../helpers/isArray')
const isObject = require('../helpers/isObject')
const deepmerge = require('deepmerge')
const defaultField = require('../defaults/defaultField')
const types = require('../types')

const formatFields = async (fields, context, prepend = '') => {
  if (!fields) {
    return {}
  }

  // if fields is function call the function
  if (typeof fields === 'function') {
    fields = await fields(context)
  }

  // if list of fields is not object
  // because formatField will be used recursively
  let formattedFields = isObject(fields) ? {} : []

  // process each field and format it
  for (let fieldKey in fields) {
    let field = fields[fieldKey]

    // if field is false so ignore it
    // this is useful for removing default fields
    if (typeof field == 'boolean' && field === false) {
      continue
    }

    // if field type is function
    // then call the function for getting
    // field type or field nested value
    if (
      !Object.values(types).includes(field) &&
      !Object.keys(types).includes(field) &&
      typeof field == 'function'
    ) {
      field = await field(context)
    }

    if (!isObject(field)) {
      // if type of field is not object by default
      // like message : String -> so convert it
      // to an object with type that equals to value
      field = {
        type: field
      }
    }

    // define field key
    field.fieldKey = fieldKey
    field.fieldNestedKey = prepend + fieldKey
    field.fieldUniqueKey = Math.random()
      .toString(36)
      .substring(7)

    // deep merge field values with default field values
    field = deepmerge(defaultField, field)

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
    else if (isObject(field.type)) {
      field.children = field.type
      field.isNested = true
      field.isObjectNested = true
      field.type = Object
    }

    // if field is nested then process the children
    if (field.children) {
      if (!field.children && field.isArrayNested) {
        field.children = []
      } else {
        field.children = await formatFields(field.children, context, prepend + fieldKey + '.')
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
  return formattedFields
}

module.exports = async function({ setFields = true, fields = undefined } = {}) {
  const context = this
  if (fields !== undefined && !fields) {
    return null
  }
  const fieldsToBeFormatted = fields || context.schema.fields
  fields = await formatFields(fieldsToBeFormatted, context)
  if (setFields) {
    context.fields = fields
  }
  return fields
}
