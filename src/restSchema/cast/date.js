/**
 *
 * @param {*} value - value to cast
 * @returns {Date}
 */
module.exports = function castDate(value) {
  if (value == null || value === "") {
    return null
  }

  if (value instanceof Date) {
    if (Number.isNaN(value.valueOf())) {
      return null
    }
    return value
  }

  let date

  if (typeof value === "boolean") {
    return null
  }

  if (value instanceof Number || typeof value === "number") {
    value = Number(value)
    date = new Date(value)
  } else if (
    typeof value === "string" &&
    !Number.isNaN(Number(value)) &&
    (Number(value) >= 275761 || Number(value) < -271820)
  ) {
    // string representation of milliseconds take this path
    date = new Date(Number(value))
  } else if (typeof value.valueOf === "function") {
    // support for moment.js. This is also the path strings will take because
    // strings have a `valueOf()`
    date = new Date(value.valueOf())
  } else {
    // fallback
    date = new Date(value)
  }

  if (!Number.isNaN(date.valueOf())) {
    return date
  }
  return null
}
