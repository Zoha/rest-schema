const isArray = require("../helpers/isArray")

module.exports = (value, of, field, context, checkString = false) => {
  let val = value
  if (val == null) {
    return false
  }
  if (checkString) {
    if (typeof val === "number") {
      val = val.toString()
    }
    if (val.toString && val.length !== undefined) {
      val = val.length
    } else {
      return false
    }
  }

  if (of instanceof Date) {
    return value <= of
  }

  if (typeof val === "string" || isArray(val)) {
    if (val.length > parseFloat(of)) {
      return false
    }
    return true
  }
  if (val > parseFloat(of)) {
    return false
  }
  return true
}
