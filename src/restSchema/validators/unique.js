module.exports = async (value, args, field, context) => {
  const foundedResource = await context.model.findOne({
    [field.nestedKey]: value
  })
  if (foundedResource) {
    return false
  }
  return true
}
