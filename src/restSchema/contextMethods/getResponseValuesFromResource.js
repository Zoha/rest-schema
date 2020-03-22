const isArray = require("../helpers/isArray")
const isObject = require("../helpers/isObject")
const isFunction = require("../helpers/isFunction")
const filter = require("../helpers/filter")
const addToFieldsArrayAsLengthOfValues = require("../helpers/addToFieldsArrayAsLengthOfInputs")

const getValues = async (argFields, values, context) => {
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

    if (value == null && field.default) {
      if (field.default) {
        let defaultValue = field.default
        if (isObject(defaultValue)) {
          defaultValue = field.default[context.route]
        }
        if (defaultValue) {
          if (isFunction(defaultValue)) {
            value = await defaultValue(context)
          } else {
            value = defaultValue
          }
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
        if (isFunction(get) && value != null) {
          value = await get(value, context)
        } else if (!isFunction(get)) {
          value = get
        }
      }
    }

    // if value was get and not equals to null or undefined
    // process the nested values for the field
    if (value != null && field.isNested && (isObject(value) || isArray(value))) {
      value = await getValues(field.children, value, context)
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

module.exports = async function(argFields, argResource) {
  const context = this
  const fields = await context.getSelectFields()
  const resource = argResource || context.resource || {}
  return getValues(fields, resource, context)
}
