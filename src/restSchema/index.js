const express = require("express")
const registerRoute = require("./registerRoute")
const schemaFormatter = require("./schemaFormatters/schemaFormatter")
const use = require("./use")
const schema = require("./schema")
const defaults = require("./defaults")
const set = require("./set")
const enums = require("./enums")
const types = require("./types")

module.exports = {
  use,
  schema,
  defaults,
  set,
  enums,
  types,

  Schema: schema,
  Model: schema,
  model: schema
}

module.exports.resource = userSchema => {
  // format schema and merge it with default
  const schema = schemaFormatter(userSchema)
  // create express router
  const router = express.Router()
  // register routes
  Object.values(schema.routes).forEach(route => {
    registerRoute(router, route, schema)
  })

  return router
}
