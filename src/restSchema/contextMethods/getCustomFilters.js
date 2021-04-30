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
 * @param {object} [args.routeFilters]
 * @returns {Promise.<object>}
 */
module.exports = async function({
  filters = null,
  relationFilters = null,
  dynamicFilters = null,
  routeFilters = null
} = {}) {
  const context = this
  dynamicFilters =
    context.cast(dynamicFilters).to(Object) || context.cast(context.dynamicFilters).to(Object) || {}
  filters = context.cast(filters).to(Object) || context.schema.filters
  routeFilters = context.cast(routeFilters).to(Object) || context.routeObject.filters || {}
  relationFilters = cast(relationFilters).to(Object) || context.relationFilters

  // if filters property is function
  if (typeof filters === "function") {
    filters = await filters(context)
  }

  // if route filters property is function
  if (typeof routeFilters === "function") {
    routeFilters = await routeFilters(context)
  }

  return { ...dynamicFilters, ...filters, ...routeFilters, ...relationFilters }
}
