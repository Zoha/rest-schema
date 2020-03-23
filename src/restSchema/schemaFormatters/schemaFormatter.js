const schemaDefaults = require("../defaults/defaultSchema")
const modelFormatter = require("./modelFormatter")
const nameFormatter = require("./nameFormatter")
const routeFormatter = require("./routeFormatter")

module.exports = userSchema => {
  // merge defaults and passed
  const schema = { ...schemaDefaults, ...userSchema }
  // merge fields
  schema.fields = { ...schemaDefaults.fields, ...(userSchema.fields || {}) }
  // merge pagination meta
  schema.pagination = {
    ...schemaDefaults.pagination,
    ...(userSchema.pagination || {})
  }
  // format schema model
  schema.model = modelFormatter(schema.model)
  // get schema name
  schema.name = nameFormatter(schema)
  // format routes
  schema.routes = routeFormatter.getRoutes(schema.routes)

  return schema
}
