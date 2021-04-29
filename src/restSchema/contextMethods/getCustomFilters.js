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
 * @param {string} [args.route]
 * @param {routes} [args.routes]
 * @param {object} [args.relationFilters]
 * @returns {Promise.<object>}
 */
module.exports = async function({ filters = null, relationFilters = null } = {}) {
  const context = this
  filters = filters || context.schema.filters
  relationFilters = cast(relationFilters).to(Object) || context.relationFilters

  // if filters property is function
  if (typeof filters === "function") {
    return await filters(context)
  }

  return { ...filters, ...relationFilters }
}
