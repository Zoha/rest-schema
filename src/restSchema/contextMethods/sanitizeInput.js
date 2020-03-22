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

module.exports = async function(argValue, sanitizers) {
  const context = this
  let value = argValue

  if (value !== undefined) {
    // cast to type
    if (sanitizers.type) {
      value = context.cast(value).to(sanitizers.type)
    }

    // default value
    if (sanitizers.default) {
      // if value has no value (undefined or null)
      // and field has a default property
      // get the default value for
      if (value == null) {
        if (sanitizers.default) {
          let defaultValue = sanitizers.default
          if (isObject(defaultValue)) {
            defaultValue = sanitizers.default[context.route]
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
    if (sanitizers.trim) {
      value = sanitizeBy("trim", value, sanitizers.trim, context)
    }

    // to lower case
    if (sanitizers.lowercase) {
      value = sanitizeBy("lowercase", value, sanitizers.lowercase, context)
    }

    // to upper case
    if (sanitizers.uppercase) {
      value = sanitizeBy("uppercase", value, sanitizers.uppercase, context)
    }
  }

  if (sanitizers.sanitize) {
    return customSanitizeHandler(value, sanitizers.sanitize, context)
  }

  return value
}
