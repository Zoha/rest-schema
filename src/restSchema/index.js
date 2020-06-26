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
