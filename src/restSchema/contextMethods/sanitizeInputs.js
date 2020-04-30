const filter = require("../helpers/filter")
const isArray = require("../helpers/isArray")
const isObject = require("../helpers/isObject")
const addToFieldsArrayAsLengthOfInputs = require("../helpers/addToFieldsArrayAsLengthOfInputs")
const cast = require("../helpers/cast")
const createMapFieldsFromInput = require("../helpers/createMapFieldsFromInput")

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

    // do the sanitization
    inputs[fieldKey] = await context.sanitizeInput({ value, field })

    // process map type
    if (field.type === Map && field.of) {
      field.type = Object
      field.isNested = true
      field.isObjectNested = true
      field.children = createMapFieldsFromInput(field.of, value, context)
    }

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

module.exports = async function({ setInputs = true, fields = null, inputs = null } = {}) {
  const context = this
  fields =
    (fields && (await context.getFields({ fields }))) ||
    context.fields ||
    (await context.getFields())
  inputs = cast(inputs).to(Object) || context.inputs || (await context.getInputs())
  const sanitizedInputs = await sanitizeInputs(fields, inputs, context)
  if (setInputs) {
    context.inputs = sanitizedInputs
  }
  return sanitizedInputs
}
