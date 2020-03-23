module.exports = (value, match) => {
  let val = value
  if (typeof val === "number") {
    val = val.toString()
  }
  if (typeof val !== "string") {
    return false
  }
  if (match instanceof RegExp) {
    return match.test(val)
  }
  if (typeof match === "string") {
    return new RegExp(match).test(val)
  }
  return false
}
