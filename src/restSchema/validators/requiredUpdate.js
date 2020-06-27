module.exports = value => {
  if (typeof value == "string") {
    return value.length > 0
  }
  return value != null
}
