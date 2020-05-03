const trim = require("../sanitizers/trim")
const uppercase = require("../sanitizers/uppercase")
const lowercase = require("../sanitizers/lowercase")
const pickUniqueItems = require("../sanitizers/pickUniqueItems")
const isObject = require("../helpers/isObject")
const isFunction = require("../helpers/isFunction")
const slice = require("../sanitizers/slice")

const availableSanitizers = {
  trim,
  slice,
  lowercase,
  uppercase,
  pickUniqueItems
}

const sanitizeBy = (type, value, shouldBeSanitized, field, context) => {
  if (isObject(shouldBeSanitized)) {
    return sanitizeBy(type, value, shouldBeSanitized[context.route], context)
  }

  if (!shouldBeSanitized || !availableSanitizers[type]) {
    return value
  }

  return availableSanitizers[type](value, shouldBeSanitized, field, context)
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
