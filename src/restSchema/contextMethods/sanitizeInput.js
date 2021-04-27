const isObject = require("../helpers/isObject")
const isFunction = require("../helpers/isFunction")
const availableSanitizers = require("../sanitizers")
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
 * @typedef {import("../../../typeDefs/field").field} field
 */

/**
 *
 * @param {*} type
 * @param {*} value
 * @param {*} shouldBeSanitized
 * @param {field} field
 * @param {context} context
 * @returns
 */
const sanitizeBy = (type, value, shouldBeSanitized, field, context) => {
  if (isObject(shouldBeSanitized)) {
    return sanitizeBy(type, value, shouldBeSanitized[context.route], field, context)
  }

  if (!shouldBeSanitized || !availableSanitizers[type]) {
    return value
  }

  return availableSanitizers[type](value, shouldBeSanitized, field, context)
}

/**
 *
 * @param {*} argValue
 * @param {*} customSanitize
 * @param {context} context
 * @returns
 */
const customSanitizeHandler = async (argValue, customSanitize, context) => {
  if (isObject(customSanitize)) {
    return customSanitizeHandler(argValue, customSanitize[context.route], context)
  }

  // custom sanitize
  let value
  if (typeof customSanitize === "function") {
    value = await customSanitize(argValue, context)
  } else {
    value = customSanitize
  }
  return value
}

/**
 * @this context
 * @param {object} args
 * @param {*} args.value
 * @param {field} args.field
 * @returns {Promise.<*>}
 */
module.exports = async function({ value, field }) {
  const context = this

  if (value !== undefined) {
    // cast to type
    if (field.type) {
      value = context.cast(value).to(field.type)
    }

    // default value
    if (field.default) {
      // if value has no value (undefined or null)
      // and field has a default property
      // get the default value for
      if (value == null) {
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
    }

    // apply all sanitizers
    Object.keys(availableSanitizers).forEach(key => {
      if (field[key]) {
        value = sanitizeBy(key, value, field[key], field, context)
      }
    })
  }

  if (field.sanitize) {
    return customSanitizeHandler(value, field.sanitize, context)
  }

  return value
}
