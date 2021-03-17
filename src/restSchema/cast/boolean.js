const trueSet = new Set([true, "true", 1, "1", "yes"])
const falseSet = new Set([false, "false", 0, "0", "no", null])

/**
 * @param {*} value - value to cast
 * @returns {boolean}
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
