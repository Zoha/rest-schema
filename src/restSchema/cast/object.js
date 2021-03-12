/**
 *
 * @param {*} val - value to cast
 * @returns {object|null}
 */
module.exports = val => {
  if (val == null) {
    return null
  }
  return typeof val === "object" ? val : {}
}
