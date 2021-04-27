/**
 * @typedef {import("../../../typeDefs/context").resource} resource
 */

const setOnContext = require("../helpers/setOnContext")

/**
 * @typedef {import("../../../typeDefs/context").context} context
 */

/**
 * @typedef {import("../../../typeDefs/field").fields} fields
 */

/**
 * @this context
 * @returns {string[]}
 */

module.exports = function() {
  const context = this
  // get array of route keys
  // if route key was a string
  // will return it as an array
  const schemaRouteKeys = context.schema.routeKeys
  if (typeof schemaRouteKeys === "string") {
    return [schemaRouteKeys]
  }
  setOnContext(context, "routeKeys", schemaRouteKeys)
  return schemaRouteKeys
}
