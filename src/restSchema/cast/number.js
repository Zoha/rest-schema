module.exports = function castNumber(value) {
  let val = value
  if (Number.isNaN(val)) {
    return val
  }

  if (val == null) {
    return val
  }

  if (val === "") {
    return null
  }

  if (typeof val === "string" || typeof val === "boolean") {
    val = Number(val)
  }

  if (val instanceof Number) {
    return val.valueOf()
  }
  if (typeof val === "number") {
    return val
  }
  if (!Array.isArray(val) && typeof val.valueOf === "function") {
    return Number(val.valueOf())
  }
  // eslint-disable-next-line eqeqeq
  if (val.toString && !Array.isArray(val) && val.toString() == Number(val)) {
    return Number(val)
  }

  return 0
}
