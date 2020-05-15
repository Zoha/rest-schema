const cast = require("../helpers/cast")
const deepMergeFilters = require("../helpers/deepMergeFilters")

module.exports = async function({
  setResource = true,
  setUpdatedResource = true,
  resource = null,
  filters = null
} = {}) {
  const context = this
  await context.hook("beforeUpdateResource")
  filters = context.cast(filters).to(Object) || {}

  resource = cast(resource).to(Object) || (await context.getResource())

  let getRouteKeysFilters = {
    $or: await context.getRouteKeysFilters()
  }
  if (!getRouteKeysFilters.$or.length) {
    getRouteKeysFilters = {}
  }
  let finalFilters = deepMergeFilters([
    getRouteKeysFilters,
    await context.getCustomFilters(),
    filters
  ])
  if (Object.keys(finalFilters).length) {
    await context.model.findOneAndUpdate(finalFilters, await context.getUpdateInputs())
  }

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
