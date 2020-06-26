const filter = require("../helpers/filter")
const isArray = require("../helpers/isArray")
const isObject = require("../helpers/isObject")
const addToFieldsArrayAsLengthOfInputs = require("../helpers/addToFieldsArrayAsLengthOfInputs")
const cast = require("../helpers/cast")
const createMapFieldsFromInput = require("../helpers/createMapFieldsFromInput")
const cloneDeep = require("clone-deep")

const validateInputs = async (argFields, inputs, context, checkRequired) => {
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
    let field = cloneDeep(fields[fieldKey])
    const key = fieldKey

    if (!checkRequired) {
      delete field.required
    }

    if (value == null) {
      // if type of value is undefined
      // just check the required field
      if (checkRequired) {
        field = {
          required: field.required,
          nestedKey: field.nestedKey
        }
      } else {
        field = null
      }
    }

    // do the validation
    const formatError = e => {
      validationErrors.push({
        value,
        location: context.findLocationOfInput({ key }),
        field: field.nestedKey,
        message: e.message
      })
    }
    try {
      if (field) {
        await context.validateInput({ value, field })
      }
    } catch (e) {
      if (e.list) {
        e.list.forEach(err => formatError(err))
      } else {
        formatError(e)
      }
    }

    // process map type
    if (field && field.type === Map && field.of) {
      field.type = Object
      field.isNested = true
      field.isObjectNested = true
      field.children = createMapFieldsFromInput(field.of, value, context)
    }

    // validate children
    if ((field && field.isNested && isArray(value)) || isObject(value)) {
      const childrenValidationErrors = await validateInputs(
        field.children,
        value,
        context,
        checkRequired
      )
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

module.exports = async function({
  setValidationErrors = true,
  fields = null,
  inputs = null,
  checkRequired = true
} = {}) {
  const context = this
  fields =
    (fields && (await context.getFields({ fields, setFields: false }))) ||
    context.fields ||
    (await context.getFields())
  inputs = cast(inputs).to(Object) || context.inputs || (await context.getInputs())
  const validationResult = await validateInputs(fields, inputs, context, checkRequired)
  if (setValidationErrors) {
    context.validationErrors = validationResult
  }
  return validationResult
}
