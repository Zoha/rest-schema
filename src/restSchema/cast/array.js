/**
 *
 * @param {*} val - value to cast
 * @returns {Array}
 */
module.exports = val => {
  if (val == null) {
    return null
  }
  return Array.isArray(val) ? val : []
}
