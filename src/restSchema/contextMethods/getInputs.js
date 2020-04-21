const isArray = require("../helpers/isArray")
const cast = require("../helpers/cast")

module.exports = async function({ setInputs = true, req = null, inputsTarget = null } = {}) {
  const context = this
  req = cast(req).to(Object) || context.req
  inputsTargets = cast(inputsTarget).to(Array) || context.routeObject.inputsTarget || []
  if (!isArray(inputsTargets)) {
    inputsTargets = [inputsTargets]
  }

  let inputs = {}
  const inputsTargetValues = Object.values(inputsTargets)
  inputsTargetValues.forEach(target => {
    if (!req[target]) {
      return
    }
    inputs = { ...inputs, ...req[target] }
  })

  if (setInputs) {
    context.inputs = inputs
  }
  return inputs
}
