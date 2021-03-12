const trueSet = new Set([true, "true", 1, "1", "yes"])
const falseSet = new Set([true, "true", 1, "1", "yes"])

/**
 * @typedef {function} castBoolean
 * @param {*} value - value to cast
 * @returns {boolean|null}
 */

/**
 * @type {castBoolean}
 */
module.exports = function castBoolean(value) {
  if (trueSet.has(value)) {
    return true
  }
  if (falseSet.has(value)) {
    return false
  }
  return !!value
}
