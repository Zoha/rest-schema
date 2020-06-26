const isObject = require("../helpers/isObject")
const isArray = require("../helpers/isArray")
const isFunction = require("../helpers/isFunction")
const checkRequired = require("../validators/required")
const checkMin = require("../validators/min")
const checkMax = require("../validators/max")
const checkBetween = require("../validators/between")
const checkMinLength = require("../validators/minLength")
const checkMaxLength = require("../validators/maxLength")
const checkBetweenLength = require("../validators/betweenLength")
const checkMatch = require("../validators/match")
const checkEnum = require("../validators/enum")
const checkUnique = require("../validators/unique")
const checkAuth = require("../validators/auth")
const uniqueItems = require("../validators/uniqueItems")
const checkExistsIn = require("../validators/existsIn")
const { RestSchemaError } = require("../errors")

const getErrorMessage = (type, key, value, args, messages) => {
  let message = messages.validations[type]
  message = message.replace(new RegExp("\\{key\\}", "g"), key)
  message = message.replace(new RegExp("\\{value\\}", "g"), value)
  if (isArray(args)) {
    Object.keys(args).forEach(argIndex => {
      message = message.replace(new RegExp(`\\{args\\[${argIndex}\\]\\}`, "g"), args[argIndex])
    })
  } else {
    message = message.replace(new RegExp("\\{args\\}", "g"), args)
  }

  return message
}

// check that field  is require or not
// works with mongoose checkRequired
const check = async ({
  value,
  validationArgs,
  key,
  field,
  context,
  validator,
  validationName,
  messages
}) => {
  // if is nested -> should be checked for each route
  if (isObject(validationArgs)) {
    return check({
      value,
      validationArgs: validationArgs[context.route],
      key,
      field,
      context,
      validator,
      validationName,
      messages
    })
  }

  // define message of validation
  const message = await getErrorMessage(validationName, key, value, validationArgs, messages)

  // callback validation args
  const callbackValidators = [checkAuth]

  let shouldBeChecked = !!validationArgs

  // if is function call the function to determine
  // that should be checked or not
  if (isFunction(validationArgs) && !callbackValidators.includes(checkAuth)) {
    shouldBeChecked = await validationArgs(value, context, key)
  }
  if (!shouldBeChecked) {
    return true
  }

  if (
    validator.constructor.name === "AsyncFunction" &&
    shouldBeChecked &&
    !(await validator(value, validationArgs, field, context))
  ) {
    throw new RestSchemaError(message)
  } else if (shouldBeChecked && !validator(value, validationArgs, field, context)) {
    throw new RestSchemaError(message)
  }
  return true
}

// check custom validation
const checkCustomValidation = async ({ value, validationArgs, key, field, context, messages }) => {
  // if is nested -> should be checked for each route
  if (isObject(validationArgs) && !validationArgs.validator) {
    return checkCustomValidation({
      value,
      validationArgs: validationArgs[context.route],
      key,
      field,
      context,
      messages
    })
  }

  const shouldBeChecked = !!validationArgs

  if (!shouldBeChecked) {
    return true
  }

  let message = await getErrorMessage("default", key, value, undefined, messages)

  let result

  // if validation is function
  // call that function
  // async throw will be handled in next
  // if falsy value was returned
  // validation message will be the default
  // message and will throw an error
  if (isFunction(validationArgs)) {
    result = await validationArgs(value, context, key)
  }

  // if type of validate was object : {validator , message}
  else if (isObject(validationArgs)) {
    // if validator was sended and is a function
    if (validationArgs.validator && isFunction(validationArgs.validator)) {
      result = await validationArgs.validator(value, context, key)
    }

    // if message was send
    // can be a function or a string
    if (!result && validationArgs.message) {
      if (isFunction(validationArgs.message)) {
        message = await validationArgs.message({ value, key }, context)
      } else if (typeof validationArgs.message === "string") {
        message = validationArgs.message
      }
    }
  }

  if (!result) {
    throw new RestSchemaError(message)
  }

  return true
}

module.exports = async function({ value, field, key } = {}) {
  const context = this
  key = key || field.nestedKey || "field"
  const messages = await context.getMessages()

  const checkValidation = async (validationName, validator) => {
    await check({
      value,
      validationArgs: field[validationName],
      key,
      field,
      context,
      validator,
      validationName,
      messages
    })
  }

  // all validations that should be applied
  const validationHandlers = {
    required: checkRequired,
    min: checkMin,
    max: checkMax,
    between: checkBetween,
    minLength: checkMinLength,
    maxLength: checkMaxLength,
    betweenLength: checkBetweenLength,
    match: checkMatch,
    enum: checkEnum,
    unique: checkUnique,
    auth: checkAuth,
    uniqueItems: uniqueItems,
    existsIn: checkExistsIn
  }

  // apply each validation
  // if any validation failed error
  // will be accrued
  const validationPromises = []
  const errors = []
  Object.keys(validationHandlers).forEach(validationName => {
    if (field[validationName]) {
      const validationHandler = validationHandlers[validationName]
      validationPromises.push(
        checkValidation(validationName, validationHandler).catch(err => {
          errors.push(err)
        })
      )
    }
  })

  await Promise.all(validationPromises)

  if (errors.length) {
    if (errors.length === 1) {
      throw errors[0]
    }
    const error = new Error(messages.listOfErrors)
    error.list = errors
    throw error
  }

  // check custom validations
  if (field.validate) {
    await checkCustomValidation({
      value,
      validationArgs: field.validate,
      key,
      field,
      context,
      messages
    })
  }
}
