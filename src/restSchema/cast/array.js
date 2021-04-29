const isObject = require("../helpers/isObject")

/**
 *
 * @param {*} val - value to cast
 * @returns {Array}
 */
module.exports = val => {
  if (val == null) {
    return null
  }
  if (isObject(val)) {
    return Object.values(val)
  }
  return Array.isArray(val) ? val : []
}
