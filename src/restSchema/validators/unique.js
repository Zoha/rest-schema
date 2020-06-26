module.exports = async (value, args, field, context) => {
  const foundedResource = await context.model.findOne({
    [field.nestedKey]: value
  })
  if (foundedResource) {
    const thisResource = await context.getResource().catch(() => {
      return
    })
    if (thisResource && thisResource._id.toString() == foundedResource._id.toString()) {
      return true
    }
    return false
  }
  return true
}
