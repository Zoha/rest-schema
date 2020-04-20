const get = require("../helpers/get")

module.exports = async function(targetString, { inputs = null } = {}) {
  const { context } = this
  const targetInputs = inputs || context.inputs || (await context.getInputs())
  return get(targetInputs, targetString)
}
