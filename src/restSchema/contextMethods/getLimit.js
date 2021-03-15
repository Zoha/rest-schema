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
 * @param {object} [args]
 * @param {number} [args.defaultLimit]
 * @param {number} [args.maxLimit]
 * @param {number} [args.minLimit]
 * @param {string} [args.limitKey]
 * @param {object} [args.inputs]
 * @returns {Promise.<number>}
 */
module.exports = async function({
  defaultLimit = null,
  maxLimit = null,
  minLimit = null,
  limitKey = null,
  inputs = null
} = {}) {
  const context = this
  let initialLimit = cast(defaultLimit).to(Number) || Number(context.schema.pagination.limit)
  inputs = cast(inputs).to(Object) || context.inputs || (await context.getInputs())
  limitKey = cast(limitKey).to(String) || context.routeObject.meta.limit
  maxLimit = cast(maxLimit).to(Number) || context.schema.pagination.maxLimit
  minLimit = cast(minLimit).to(Number) || context.schema.pagination.minLimit

  defaultLimit = initialLimit

  if (Number.isNaN(initialLimit)) {
    initialLimit = 10
    defaultLimit = initialLimit
  }

  if (inputs[limitKey]) {
    initialLimit = Number(inputs[limitKey])
    if (initialLimit > maxLimit || initialLimit < minLimit) {
      initialLimit = defaultLimit
    }
    if (Number.isNaN(initialLimit)) {
      initialLimit = 10
    }
  }

  if (initialLimit === 0) {
    return 1
  }
  return initialLimit
}
