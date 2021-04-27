/**
 * @typedef {import("../../../typeDefs/context").resource} resource
 */

/**
 * @typedef {import("../../../typeDefs/context").context} context
 */

/**
 * @this context
 * @param {object} [args]
 * @param {boolean} [args.setResource]
 * @param {boolean} [args.setCreatedResource]
 * @param {object} [args.inputs]
 * @returns {Promise.<resource>}
 */
module.exports = async function({
  setResource = true,
  setCreatedResource = true,
  inputs = null
} = {}) {
  const context = this

  await context.hook("beforeCreateResource")

  inputs = context.cast(inputs).to(Object) || (await context.getCreateInputs())
  const resource = await context.model.create(inputs)
  if (setCreatedResource) {
    context.createdResource = resource
  }
  if (setResource) {
    context.resource = resource
  }
  await context.hook("afterCreateResource")
  return resource
}
