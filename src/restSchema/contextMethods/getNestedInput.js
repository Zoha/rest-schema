const get = require("../helpers/get")
const cast = require("../helpers/cast")

module.exports = async function({ key, inputs = null } = {}) {
  const context = this
  inputs = cast(inputs).to(Object) || context.inputs || (await context.getInputs())
  return get(inputs, key)
}
