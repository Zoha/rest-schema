module.exports = function() {
  const context = this
  // get array of route keys
  // if route key was a string
  // will return it as an array
  const schemaRouteKeys = context.schema.routeKeys
  if (typeof schemaRouteKeys == "string") {
    return [schemaRouteKeys]
  }
  context.routeKeys = schemaRouteKeys
  return schemaRouteKeys
}
