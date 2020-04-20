const get = require("../helpers/get")

module.exports = function(key, { req = null, inputsTarget = null } = {}) {
  const context = this

  let foundTarget = null
  const inputsTargets = inputsTarget || context.routeObject.inputsTarget.slice().reverse()
  const request = req || context.req
  Object.values(inputsTargets).forEach(target => {
    if (foundTarget == null && get(request[target], key)) {
      foundTarget = target
    }
  })
  return foundTarget
}
