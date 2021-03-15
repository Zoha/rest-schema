/**
 * @typedef {import("../../../typeDefs/context").resource} resource
 */

/**
 * @typedef {import("../../../typeDefs/context").context} context
 */

/**
 * @typedef {import("../../../typeDefs/route").routes} routes
 */

/**
 * @typedef {import("../../../typeDefs/field").fields} fields
 */

/**
 * @this context
 * @returns {routes}
 */
module.exports = function() {
  const context = this
  return context.schema.routes
}
