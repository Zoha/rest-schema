const get = require("../helpers/get")

module.exports = async function(target) {
  const { context } = this
  const inputs = context.inputs || (await context.getInputs())
  return get(inputs, target)
}
