/**
 *
 * @param {*} val - value to cast
 * @returns {object}
 */
module.exports = val => {
  if (val == null) {
    return null
  }
  return typeof val === "object" ? val : {}
}
