const use = require("./use")
const schema = require("./schema")
const defaults = require("./defaults")
const set = require("./set")
const enums = require("./enums")
const types = require("./types")
const CustomType = require("./customType")

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
  model: schema
}
