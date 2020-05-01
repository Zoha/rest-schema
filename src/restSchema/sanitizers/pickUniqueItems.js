const isArray = require("../helpers/isArray")
const unique = require("../helpers/unique")
const isBoolean = require("../helpers/isBoolean")

module.exports = async (value, callback, field, context) => {
  if (!value || !isArray(value) || !value.length) {
    return value
  }
  callback = isBoolean(callback) ? undefined : callback
  const uniqueValues = await unique(value, callback, context)
  return uniqueValues
}
