const deepMergeFilters = require("../helpers/deepMergeFilters")

/**
 * @typedef {import("../../../typeDefs/context").resource} resource
 */

/**
 * @typedef {import("../../../typeDefs/context").context} context
 */

/**
 * @this context
 * @param {object} [args]
 * @param {boolean} [args.setDeletedResource]
 * @param {resource} [args.resource]
 * @param {boolean} [args.filters]
 * @returns {Promise.<resource>}
 */
module.exports = async function({
  setDeletedResource = true,
  resource = null,
  filters = null
} = {}) {
  const context = this
  filters = context.cast(filters).to(Object) || {}

  await context.hook("beforeDeleteResource")

  resource =
    context.cast(resource).to(Object) || (await context.getResource({ errorOnNotFound: true }))

  let getRouteKeysFilters = {}
  getRouteKeysFilters = {
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
    await context.model.findOneAndRemove(finalFilters)
  }

  if (setDeletedResource) {
    context.deletedResource = resource
  }
  await context.hook("afterDeleteResource")

  return resource
}
