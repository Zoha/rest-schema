const get = require("../helpers/get")
const cast = require("../helpers/cast")

module.exports = function({ key, req = null, inputsTargets = null } = {}) {
  const context = this

  let foundTarget = null
  inputsTargets =
    cast(inputsTargets).to(Array) || context.routeObject.inputsTarget.slice().reverse()
  const request = req || context.req
  Object.values(inputsTargets).forEach(target => {
    if (foundTarget == null && get(request[target], key)) {
      foundTarget = target
    }
  })
  return foundTarget
}
