const globalDefaults = require("../defaults")
const modelFormatter = require("./modelFormatter")
const nameFormatter = require("./nameFormatter")
const routeFormatter = require("./routeFormatter")
const cloneDeep = require("clone-deep")

module.exports = userSchema => {
  // merge defaults and passed
  const defaults = { ...cloneDeep(globalDefaults), ...(userSchema.defaults || {}) }
  const clonedSchemaDefaults = defaults.defaultSchema
  const schema = { ...clonedSchemaDefaults, ...userSchema }
  // define default data, cloned global defaults, or userSchema defaults
  schema.defaults = defaults
  // merge fields
  schema.fields = { ...clonedSchemaDefaults.fields, ...(userSchema.fields || {}) }
  // merge pagination meta
  schema.pagination = {
    ...clonedSchemaDefaults.pagination,
    ...(userSchema.pagination || {})
  }
  // merge pagination meta
  schema.wrappers = {
    ...clonedSchemaDefaults.wrappers,
    ...(userSchema.wrappers || {})
  }
  // format schema model
  schema.model = modelFormatter(schema.model)
  // get schema name
  schema.name = nameFormatter(schema)
  // format routes
  schema.routes = routeFormatter.getRoutes(schema.routes, defaults)
  return schema
}
