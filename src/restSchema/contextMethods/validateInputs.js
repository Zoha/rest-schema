const filter = require("../helpers/filter")
const isArray = require("../helpers/isArray")
const isObject = require("../helpers/isObject")
const addToFieldsArrayAsLengthOfInputs = require("../helpers/addToFieldsArrayAsLengthOfInputs")

const validateInputs = async (argFields, inputs, context) => {
  if (!argFields) {
    return isArray(inputs) ? [] : {}
  }
  let validationErrors = []

  // if type of fields are array
  // and count of fields are lower that inputs
  // add fields item to equal length of the inputs
  const fields = addToFieldsArrayAsLengthOfInputs(argFields, inputs)

  const executeLoopOperation = async fieldKey => {
    // define value, validations, key
    const value = inputs[fieldKey]
    const field = fields[fieldKey]
    const key = fieldKey

    let validations = {}
    const availableValidations = [
      "required",
      "min",
      "max",
      "between",
      "minLength",
      "maxLength",
      "betweenLength",
      "match",
      "enum",
      "validate",
      "unique"
    ]

    if (value == null) {
      // if type of value is undefined
      // just check the required field
      validations = {
        required: field.required
      }
    } else {
      // separate validation properties in the field
      validations = filter(field, (i, k) => availableValidations.includes(k))
    }

    // do the validation
    const formatError = e => {
      validationErrors.push({
        value,
        location: context.findLocationOfInput(key),
        field: field.nestedKey,
        message: e.message
      })
    }
    try {
      await context.validateInput(value, validations, field.nestedKey)
    } catch (e) {
      if (e.list) {
        e.list.forEach(err => formatError(err))
      } else {
        formatError(e)
      }
    }

    // validate children
    if ((field.isNested && isArray(value)) || isObject(value)) {
      const childrenValidationErrors = await validateInputs(field.children, value, context)
      childrenValidationErrors.forEach(error => {
        validationErrors.push(error)
      })
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

  return filter(validationErrors, i => i != null)
}

module.exports = async function({ setValidationErrors = true } = {}) {
  const context = this
  const fields = context.fields || (await context.getFields())
  const inputs = context.inputs || (await context.getInputs())
  const validationResult = await validateInputs(fields, inputs, context)
  if (setValidationErrors) {
    context.validationErrors = validationResult
  }
  return validationResult
}
