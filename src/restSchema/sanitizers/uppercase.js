module.exports = value => {
  if (value && value.toUpperCase) {
    return value.toUpperCase()
  }
  return null
}
