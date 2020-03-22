const filter = require("../helpers/filter")
const isArray = require("../helpers/isArray")
const isObject = require("../helpers/isObject")
const addToFieldsArrayAsLengthOfInputs = require("../helpers/addToFieldsArrayAsLengthOfInputs")

const sanitizeInputs = async (argFields, argInputs, context) => {
  const inputs = argInputs
  if (!argFields) {
    return isArray(inputs) ? [] : {}
  }
  // if type of fields are array
  // and count of fields are lower that inputs
  // add fields item to equal length of the inputs
  const fields = addToFieldsArrayAsLengthOfInputs(argFields, inputs)

  const executeLoopOperation = async fieldKey => {
    const value = inputs[fieldKey]
    const field = fields[fieldKey]

    let sanitizes = {}
    const availableSanitizes = ["default", "type", "sanitize", "trim", "lowercase", "uppercase"]

    // separate sanitization properties in the field
    sanitizes = filter(field, (i, k) => availableSanitizes.includes(k))

    // do the sanitization
    inputs[fieldKey] = await context.sanitizeInput(value, sanitizes)

    // sanitize children
    if ((field.isNested && isArray(value)) || isObject(value)) {
      inputs[fieldKey] = await sanitizeInputs(field.children, value, context)
    }
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

  return filter(inputs, i => i !== undefined)
}

module.exports = async function({ setInputs = true } = {}) {
  const context = this
  const fields = context.fields || (await context.getFields())
  const inputs = context.inputs || (await context.getInputs())
  const sanitizedInputs = await sanitizeInputs(fields, inputs, context)
  if (setInputs) {
    context.inputs = sanitizedInputs
  }
  return sanitizedInputs
}
