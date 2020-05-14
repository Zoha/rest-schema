module.exports = async function({ setDeletedResource = true, resource = null } = {}) {
  const context = this

  await context.hook("beforeDeleteResource")

  resource =
    context.cast(resource).to(Object) || (await context.getResource({ errorOnNotFound: true }))

  let getRouteKeysFilters = await context.getRouteKeysFilters()
  if (!getRouteKeysFilters.length) {
    getRouteKeysFilters = [
      {
        _id: null
      }
    ]
  }
  await context.model.findOneAndRemove({
    $or: getRouteKeysFilters,
    ...(await context.getCustomFilters())
  })

  if (setDeletedResource) {
    context.deletedResource = resource
  }
  await context.hook("afterDeleteResource")

  return resource
}
