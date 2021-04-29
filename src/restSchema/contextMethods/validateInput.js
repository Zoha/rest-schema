const isObject = require("../helpers/isObject")
const isArray = require("../helpers/isArray")
const isFunction = require("../helpers/isFunction")
const validationHandlers = require("../validators")
const { RestSchemaError } = require("../errors")
const mongoose = require("mongoose")

const getErrorMessage = (type, key, value, args, messages) => {
  let message = messages.validations[type]
  message = message.replace(new RegExp("\\{key\\}", "g"), key)
  message = message.replace(new RegExp("\\{value\\}", "g"), value)
  if (isArray(args)) {
    Object.keys(args).forEach(argIndex => {
      const argItem =
        args[argIndex] instanceof Date ? args[argIndex].toLocaleString() : args[argIndex]
      message = message.replace(new RegExp(`\\{args\\[${argIndex}\\]\\}`, "g"), argItem)
    })
  } else {
    const argString = args instanceof Date ? args.toLocaleString() : args
    message = message.replace(new RegExp("\\{args\\}", "g"), argString)
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
  if (isObject(validationArgs) && validationArgs[context.route]) {
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
  const callbackValidators = [validationHandlers.auth, validationHandlers.uniqueItems]

  let shouldBeChecked = !!validationArgs

  // if is function call the function to determine
  // that should be checked or not
  if (isFunction(validationArgs) && !callbackValidators.includes(validator)) {
    if (
      !(validationArgs.prototype instanceof mongoose.Model) &&
      !(validationArgs instanceof require("../schemaBuilder").SchemaBuilder)
    ) {
      shouldBeChecked = await validationArgs(value, context, key)
    }
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

/**
 * @typedef {import("../../../typeDefs/context").resource} resource
 */

/**
 * @typedef {import("../../../typeDefs/context").context} context
 */

/**
 * @typedef {import("../../../typeDefs/field").fields} fields
 * @typedef {import("../../../typeDefs/field").field} field
 */

/**
 * @this context
 * @param {object} args
 * @param {*} [args.value]
 * @param {field} args.field
 * @param {string} [args.key]
 * @returns {Promise.<object>}
 */
module.exports = async function({ value, field, key = null }) {
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
    // @ts-ignore
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
