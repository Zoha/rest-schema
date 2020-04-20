const trim = require("../sanitizers/trim")
const uppercase = require("../sanitizers/uppercase")
const lowercase = require("../sanitizers/lowercase")
const isObject = require("../helpers/isObject")
const isFunction = require("../helpers/isFunction")

const availableSanitizers = {
  trim,
  lowercase,
  uppercase
}

const sanitizeBy = (type, value, shouldBeSanitized, context) => {
  if (isObject(shouldBeSanitized)) {
    return sanitizeBy(type, value, shouldBeSanitized[context.route], context)
  }

  if (!shouldBeSanitized || !availableSanitizers[type]) {
    return value
  }

  return availableSanitizers[type](value)
}

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

    // trim value
    if (field.trim) {
      value = sanitizeBy("trim", value, field.trim, context)
    }

    // to lower case
    if (field.lowercase) {
      value = sanitizeBy("lowercase", value, field.lowercase, context)
    }

    // to upper case
    if (field.uppercase) {
      value = sanitizeBy("uppercase", value, field.uppercase, context)
    }
  }

  if (field.sanitize) {
    return customSanitizeHandler(value, field.sanitize, context)
  }

  return value
}
