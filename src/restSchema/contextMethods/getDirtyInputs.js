const isArray = require("../helpers/isArray")
const isObject = require("../helpers/isObject")

/**
 * @typedef {import("../../../typeDefs/context").resource} resource
 */

/**
 * @typedef {import("../../../typeDefs/context").context} context
 */

/**
 * @typedef {import("../../../typeDefs/field").fields} fields
 */

const getDiffInputs = (inputs, resourceInputs) => {
  const dirties = isObject(inputs) ? {} : []
  for (const inputKey in inputs) {
    if (inputs[inputKey] === undefined) {
      continue
    }
    if (
      (isObject(resourceInputs[inputKey]) && isObject(inputs[inputKey])) ||
      (isArray(resourceInputs[inputKey]) && isArray(inputs[inputKey]))
    ) {
      dirties[inputKey] = getDiffInputs(inputs[inputKey], resourceInputs[inputKey])
    } else if (
      (inputs[inputKey] == null || resourceInputs[inputKey] == null) &&
      inputs[inputKey] !== resourceInputs[inputKey]
    ) {
      dirties[inputKey] = inputs[inputKey]
    } else if (inputs[inputKey].toString() !== resourceInputs[inputKey].toString()) {
      dirties[inputKey] = inputs[inputKey]
    }
  }
  return dirties
}

/**
 * @this context
 * @param {object} [args]
 * @param {boolean} [args.setDirtyInputs]
 * @param {object} [args.inputs]
 * @param {resource} [args.resource]
 * @param {boolean} [args.force]
 * @returns {Promise.<object>}
 */

module.exports = async function({
  setDirtyInputs = true,
  force = false,
  inputs = null,
  resource = null
} = {}) {
  const context = this
  if (context.dirtyInputs && !force) {
    return context.dirtyInputs
  }
  resource = this.cast(resource).to(Object) || (await context.getResource())
  if (!resource) {
    return {}
  }
  inputs = this.cast(inputs).to(Object) || context.inputs || (await context.getInputs())

  // for each input
  const dirtyInputs = getDiffInputs(inputs, resource)

  if (setDirtyInputs) {
    context.dirtyInputs = dirtyInputs
  }

  return dirtyInputs
}
