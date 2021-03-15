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
 * @returns {Promise.<number>}
 */
module.exports = async function({ setTotal = true, filters = null } = {}) {
  const context = this
  filters = cast(filters).to(Object) || (await context.getFilters())

  const total = await context.model.countDocuments(filters)

  if (setTotal) {
    context.total = total
  }
  return total
}
