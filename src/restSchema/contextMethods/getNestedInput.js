const get = require("../helpers/get")
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
 * @this context
 * @param {object} args
 * @param {string} args.key
 * @param {object} [args.inputs]
 * @returns {Promise.<*>}
 */
module.exports = async function({ key, inputs = null }) {
  const context = this
  inputs = cast(inputs).to(Object) || context.inputs || (await context.getInputs())
  return get(inputs, key)
}
