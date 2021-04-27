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
  errors
}
