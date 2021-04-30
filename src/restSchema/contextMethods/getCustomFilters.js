const cast = require("../helpers/cast")

/**
 * @typedef {import("../../../typeDefs/context").resource} resource
 */

/**
 * @typedef {import("../../../typeDefs/context").context} context
 */

/**
 * @typedef {import("../../../typeDefs/route").route} route
 * @typedef {route[]} routes
 */

/**
 * @this context
 * @param {object} [args]
 * @param {object} [args.filters]
 * @param {object} [args.relationFilters]
 * @param {object} [args.dynamicFilters]
 * @returns {Promise.<object>}
 */
module.exports = async function({
  filters = null,
  relationFilters = null,
  dynamicFilters = null
} = {}) {
  const context = this
  dynamicFilters =
    context.cast(dynamicFilters).to(Object) || context.cast(context.dynamicFilters).to(Object) || {}
  filters = filters || context.schema.filters
  relationFilters = cast(relationFilters).to(Object) || context.relationFilters

  // if filters property is function
  if (typeof filters === "function") {
    return await filters(context)
  }

  return { ...dynamicFilters, ...filters, ...relationFilters }
}
