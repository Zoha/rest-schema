const isArray = require("../helpers/isArray")
const unique = require("../helpers/unique")
const isBoolean = require("../helpers/isBoolean")

module.exports = async (value, callback, field, context) => {
  if (!value) {
    return false
  }
  if (!isArray(value) || !value.length) {
    return true
  }
  callback = isBoolean(callback) ? undefined : callback
  const uniqueValues = await unique(value, callback, context)
  if (uniqueValues.length !== value.length) {
    return false
  }
  return true
}
