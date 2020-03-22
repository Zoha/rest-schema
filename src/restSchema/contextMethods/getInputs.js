const isArray = require("../helpers/isArray")

module.exports = async function({ setInputs = true } = {}) {
  const context = this
  let inputsTarget = context.routeObject.inputsTarget || []
  if (!isArray(inputsTarget)) {
    inputsTarget = [inputsTarget]
  }

  let inputs = {}
  const inputsTargetValues = Object.values(inputsTarget)
  inputsTargetValues.forEach(target => {
    if (!context.req[target]) {
      return
    }
    inputs = { ...inputs, ...context.req[target] }
  })

  if (setInputs) {
    context.inputs = inputs
  }
  return inputs
}
