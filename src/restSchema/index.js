/** @module rest-schema */

const use = require("./use")
const schema = require("./schema")
const defaults = require("./defaults")
const set = require("./set")
const enums = require("./enums")
const types = require("./types")
const CustomType = require("./customType")
const errors = require("./errors")
const RouteManager = require("./routeManager")
const MiddlewareManager = require("./middlewareManager")

// type defs
require("../../typeDefs/context")
require("../../typeDefs/field")
require("../../typeDefs/route")
require("../../typeDefs/schema")

// require files for typeDefs
require("./addSchemaModel")
require("./createContext")
require("./CustomObjectId")
require("./getSchemaModel")
require("./registerRoute")
require("./schemaBuilder")
require("./errors/invalidArgumentError")
require("./errors/notFoundError")
require("./errors/restSchemaError")
require("./errors/validationError")

module.exports = {
  use,
  schema,
  defaults,
  RouteManager,
  MiddlewareManager,
  set,
  enums,
  types,
  CustomType,
  Schema: schema,
  Model: schema,
  model: schema,
  errors,
  ...errors
}
