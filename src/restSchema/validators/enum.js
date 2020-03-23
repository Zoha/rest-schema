module.exports = (value, validItems, key, context) => {
  if (validItems.includes(value)) {
    return true
  }
  return false
}
