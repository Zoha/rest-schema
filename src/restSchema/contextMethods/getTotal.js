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
 * @param {boolean} [args.setTotal]
 * @param {object} [args.filters]
 * @param {boolean} [args.force]
 * @returns {Promise.<number>}
 */
module.exports = async function({ setTotal = true, filters = null, force = false } = {}) {
  const context = this
  if (!force && context.total) {
    return context.total
  }

  filters = cast(filters).to(Object) || {}

  const requestFilters = await context.getFilters()

  const total = await context.model.countDocuments({
    ...requestFilters,
    ...filters
  })

  if (setTotal) {
    context.total = total
  }
  return total
}
