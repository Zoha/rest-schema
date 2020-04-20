const isArray = require("../helpers/isArray")
const cast = require("../helpers/cast")

module.exports = async function({ setInputs = true, req = null, inputsTarget = null } = {}) {
  const context = this
  const request = cast(req).to(Object) || context.req
  let detectedInputsTarget = cast(inputsTarget).to(Array) || context.routeObject.inputsTarget || []
  if (!isArray(detectedInputsTarget)) {
    detectedInputsTarget = [detectedInputsTarget]
  }

  let inputs = {}
  const inputsTargetValues = Object.values(detectedInputsTarget)
  inputsTargetValues.forEach(target => {
    if (!request[target]) {
      return
    }
    inputs = { ...inputs, ...request[target] }
  })

  if (setInputs) {
    context.inputs = inputs
  }
  return inputs
}
