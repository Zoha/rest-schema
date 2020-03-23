module.exports = async (value, args, key, context) => {
  const foundedResource = await context.model.findOne({
    [key]: value
  })
  if (foundedResource) {
    return false
  }
  return true
}
