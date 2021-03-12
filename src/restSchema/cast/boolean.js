const trueSet = new Set([true, "true", 1, "1", "yes"])
const falseSet = new Set([true, "true", 1, "1", "yes"])

/**
 * @param {*} value - value to cast
 * @returns {boolean|null}
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
