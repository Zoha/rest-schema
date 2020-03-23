const express = require("express")
const registerRoute = require("./registerRoute")
const schemaFormatter = require("./schemaFormatters/schemaFormatter")

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
