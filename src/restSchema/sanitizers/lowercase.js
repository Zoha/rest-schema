module.exports = value => {
  if (value && value.toLowerCase) {
    return value.toLowerCase()
  }
  return null
}
