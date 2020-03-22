module.exports = async function({ setDeletedResource = true, resource = null } = {}) {
  const context = this

  await context.hook("beforeDeleteResource")

  const detectedResource =
    context.cast(resource).to(Object) || (await context.getResource({ errorOnNotFound: true }))

  await context.model.findOneAndRemove({
    $or: await context.getRouteKeysFilters(),
    ...context.getCustomFilters()
  })

  if (setDeletedResource) {
    context.deletedResource = detectedResource
  }
  await context.hook("afterDeleteResource")

  return resource
}
