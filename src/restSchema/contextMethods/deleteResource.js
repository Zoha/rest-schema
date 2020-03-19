module.exports = async function({ setDeletedResource = true, resource = null } = {}) {
  const context = this

  await context.hook('beforeDeleteResource')

  resource =
    context.cast(resource).to(Object) || (await context.getResource({ errorOnNotFound: true }))

  await context.model.findOneAndDelete({
    $or: await context.getRouteKeysFilters(),
    ...context.getCustomFilters()
  })

  if (setDeletedResource) {
    context.deletedResource = resource
  }
  await context.hook('afterDeleteResource')

  return resource
}
