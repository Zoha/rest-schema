/**
 * @typedef {import("../../../typeDefs/context").resource} resource
 */

/**
 * @typedef {import("../../../typeDefs/context").context} context
 */

/**
 * @typedef {import("../../../typeDefs/field").fields} fields
 */

/**
 * @this context
 * @param {object} [args]
 * @param {object} [args.filters]
 * @param {number} [args.sort]
 * @param {number} [args.limit]
 * @param {string} [args.select]
 * @param {number} [args.page]
 * @param {number} [args.skip]
 * @param {object} [args.inputs]
 * @param {boolean} [args.setInputs]
 * @param {boolean} [args.force]
 * @param {route} [args.route]
 * @returns {Promise.<object>}
 */
module.exports = async function({
  filters = null,
  sort = null,
  limit = null,
  select = null,
  page = null,
  skip = null,
  inputs = null,
  setInputs = true,
  force = false,
  route = null
} = {}) {
  const context = this
  route = context.cast(route).to(Object) || context.routeObject
  const metaKeys = route.meta
  inputs =
    context.cast(inputs).to(Object) ||
    context.inputs ||
    (await context.getInputs({
      force
    }))

  if (filters) {
    context.dynamicFilters = {
      ...(context.dynamicFilters || {}),
      ...filters
    }
  }

  const otherMetaTargets = {
    sort,
    skip,
    page,
    select,
    limit
  }

  for (const targetName in otherMetaTargets) {
    if (otherMetaTargets[targetName]) {
      inputs[metaKeys[targetName]] = otherMetaTargets[targetName]
    }
  }

  if (setInputs) {
    context.inputs = inputs
  }
  return inputs
}
