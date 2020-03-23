const checkMin = require("./min")
const checkMax = require("./max")

module.exports = (value, [min, max], key, context, checkString = false) => {
  if (checkMin(value, min, checkString) && checkMax(value, max, checkString)) {
    return true
  }
  return false
}
