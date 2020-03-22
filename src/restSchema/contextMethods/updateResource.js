module.exports = async function({ setResource = true, setUpdatedResource = true } = {}) {
  const context = this
  await context.hook("beforeUpdateResource")
  let resource = await context.getResource()

  await context.model.findOneAndUpdate(
    {
      $or: await context.getRouteKeysFilters(),
      ...context.getCustomFilters()
    },
    await context.getUpdateInputs()
  )

  // eslint-disable-next-line no-underscore-dangle
  const resourceId = resource._id
  resource = await context.getResource({
    setResource: setResource,
    errorOnNotFound: true,
    force: true,
    resourceId
  })

  if (setUpdatedResource) {
    context.updatedResource = resource
  }
  await context.hook("afterUpdateResource")
  return resource
}
