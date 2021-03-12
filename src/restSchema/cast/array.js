/**
 * @param {*} val - value to cast
 * @returns {array|null}
 */
module.exports = val => {
  if (val == null) {
    return null
  }
  return Array.isArray(val) ? val : []
}
