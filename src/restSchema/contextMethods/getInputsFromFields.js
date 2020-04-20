const isArray = require("../helpers/isArray")
const isObject = require("../helpers/isObject")
const isFunction = require("../helpers/isFunction")
const filter = require("../helpers/filter")
const addToFieldsArrayAsLengthOfInputs = require("../helpers/addToFieldsArrayAsLengthOfInputs")

const getInputs = async (argFields, inputs, context) => {
  if (!argFields) {
    return isArray(inputs) ? [] : {}
  }
  // define object for final results
  let result = {}
  // if target should be array
  if (isArray(argFields)) {
    result = []
  }

  // if type of fields are array
  // and count of fields are lower that inputs
  // add fields item to equal length of the inputs
  const fields = addToFieldsArrayAsLengthOfInputs(argFields, inputs)

  const executeLoopOperation = async fieldKey => {
    // define field and value
    const field = fields[fieldKey]
    let value = context.cast(inputs[fieldKey]).to(field.type || String)

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

    // if value have a set
    // or is an object that has set
    // then get value by the set function or set value
    if (field.set) {
      let { set } = field
      if (isObject(set)) {
        set = field.set[context.route]
      }
      if (set) {
        if (isFunction(set) && value != null) {
          value = await set(value, context)
        } else if (!isFunction(set)) {
          value = set
        }
      }
    }

    // if value was set and not equals to null or undefined
    // process the nested values for the field
    if (value != null && field.isNested && (isObject(value) || isArray(value))) {
      value = await getInputs(field.children, value, context)
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

module.exports = async function({ fields = null } = {}) {
  const context = this
  const fieldsToGetInputsFrom =
    (fields && (await context.getFields({ fields }))) ||
    context.fields ||
    (await context.getFields())
  return getInputs(fieldsToGetInputsFrom, context.inputs, context)
}
