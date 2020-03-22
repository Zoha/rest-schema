const get = require("../helpers/get")

module.exports = function(key) {
  const context = this

  let foundTarget = null
  const inputTargets = context.routeObject.inputsTarget.slice().reverse()
  Object.values(inputTargets).forEach(target => {
    if (foundTarget == null && get(context.req[target], key)) {
      foundTarget = target
    }
  })
  return foundTarget
}
