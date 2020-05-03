module.exports = (value, [start, end]) => {
  if (value && value.slice) {
    return value.slice(start, end)
  }
  return value
}
