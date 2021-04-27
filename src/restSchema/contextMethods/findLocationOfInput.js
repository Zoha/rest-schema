const get = require("../helpers/get")
const cast = require("../helpers/cast")

/**
 * @typedef {import("../../../typeDefs/context").resource} resource
 */

/**
 * @typedef {import("../../../typeDefs/context").context} context
 */

/**
 * @this context
 * @param {object} obj
 * @param {string} obj.key
 * @param {string} [obj.req = null]
 * @param {string} [obj.inputsTargets = null]
 * @returns {Promise.<resource>}
 */
module.exports = function({ key, req = null, inputsTargets = null }) {
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
