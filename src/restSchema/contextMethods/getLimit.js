const ValidationError = require("../errors/validationError")
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
 * @typedef {import("../../../typeDefs/schema").paginationProps} paginationProps
 */

/**
 * @this context
 * @param {object} [args]
 * @param {number} [args.defaultLimit]
 * @param {number} [args.maxLimit]
 * @param {number} [args.minLimit]
 * @param {string} [args.limitKey]
 * @param {object} [args.inputs]
 * @param {paginationProps} [args.pagination]
 * @returns {Promise.<number>}
 */
module.exports = async function({
  defaultLimit = null,
  maxLimit = null,
  minLimit = null,
  limitKey = null,
  inputs = null,
  pagination = null
} = {}) {
  const context = this
  pagination = context.cast(pagination).to(Object) || (await context.getPaginationData())
  let initialLimit = cast(defaultLimit).to(Number) || Number(pagination.limit)
  inputs = cast(inputs).to(Object) || context.inputs || (await context.getInputs())
  limitKey = cast(limitKey).to(String) || context.routeObject.meta.limit
  maxLimit = cast(maxLimit).to(Number) || pagination.maxLimit
  minLimit = cast(minLimit).to(Number) || pagination.minLimit

  defaultLimit = initialLimit

  if (Number.isNaN(initialLimit)) {
    initialLimit = 10
    defaultLimit = initialLimit
  }

  if (inputs[limitKey]) {
    initialLimit = Number(inputs[limitKey])
    if (initialLimit > maxLimit || initialLimit < minLimit) {
      if (context.schema.errorOnInvalidLimit) {
        const errorMessages = context.getMessages()
        throw new ValidationError(
          errorMessages.validations.between
            .replace(new RegExp("\\{key\\}", "g"), limitKey)
            .replace(new RegExp(`\\{args\\[${0}\\]\\}`, "g"), minLimit)
            .replace(new RegExp(`\\{args\\[${1}\\]\\}`, "g"), maxLimit)
        )
      }
      if (initialLimit > maxLimit) {
        initialLimit = maxLimit
      } else {
        initialLimit = minLimit
      }
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
