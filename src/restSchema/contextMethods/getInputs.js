const isArray = require("../helpers/isArray")
const cast = require("../helpers/cast")

/**
 * @typedef {import("../../../typeDefs/context").resource} resource
 */

/**
 * @typedef {import("../../../typeDefs/context").context} context
 */

/**
 * @typedef {import("../../../typeDefs/field").fields} fields
 */

/**
 * @typedef {import("../../../typeDefs/context").request} request
 */

/**
 * @this context
 * @param {object} [args]
 * @param {boolean} [args.setInputs]
 * @param {request} [args.req]
 * @param {string[]} [args.inputsTarget]
 * @param {boolean} [args.force]
 * @returns {Promise.<object>}
 */
module.exports = async function({
  setInputs = true,
  req = null,
  inputsTarget = null,
  force = false
} = {}) {
  const context = this
  if (context.inputs && !force) {
    return context.inputs
  }
  req = cast(req).to(Object) || context.req
  let inputsTargets = cast(inputsTarget).to(Array) || context.routeObject.inputsTarget || []
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
