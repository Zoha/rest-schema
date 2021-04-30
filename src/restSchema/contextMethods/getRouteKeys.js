/**
 * @typedef {import("../../../typeDefs/context").resource} resource
 */

const isArray = require("../helpers/isArray")
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
  const route = context.routeObject
  // get array of route keys
  // if route key was a string
  // will return it as an array
  let schemaRouteKeys = context.schema.routeKeys
  if (typeof schemaRouteKeys === "string") {
    schemaRouteKeys = [schemaRouteKeys]
  }
  let routeSpecificRouteKeys = []
  if (route.routeKeys) {
    if (typeof route.routeKeys === "string") {
      routeSpecificRouteKeys = [schemaRouteKeys]
    } else if (isArray(route.routeKeys)) {
      routeSpecificRouteKeys = route.routeKeys
    }
  }
  setOnContext(context, "routeKeys", [...schemaRouteKeys, ...routeSpecificRouteKeys])
  return schemaRouteKeys
}
