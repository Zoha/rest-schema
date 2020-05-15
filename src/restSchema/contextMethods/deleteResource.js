module.exports = async function({ setDeletedResource = true, resource = null, filters = {} } = {}) {
  const context = this

  await context.hook("beforeDeleteResource")

  resource =
    context.cast(resource).to(Object) || (await context.getResource({ errorOnNotFound: true }))

  let getRouteKeysFilters = {
    $or: await context.getRouteKeysFilters()
  }
  if (!getRouteKeysFilters.$or.length) {
    getRouteKeysFilters = {}
  }
  let finalFilters = {
    ...getRouteKeysFilters,
    ...(await context.getCustomFilters())
  }
  if (Object.keys(finalFilters).length) {
    await context.model.findOneAndRemove(finalFilters)
  }

  if (setDeletedResource) {
    context.deletedResource = resource
  }
  await context.hook("afterDeleteResource")

  return resource
}
