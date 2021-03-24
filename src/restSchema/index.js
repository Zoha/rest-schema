/** @module rest-schema */

const use = require("./use")
const schema = require("./schema")
const defaults = require("./defaults")
const set = require("./set")
const enums = require("./enums")
const types = require("./types")
const CustomType = require("./customType")
const errors = require("./errors")

// type defs
require("../../typeDefs/context")
require("../../typeDefs/field")
require("../../typeDefs/route")
require("../../typeDefs/schema")

module.exports = {
  use,
  schema,
  defaults,
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
