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
 * @param {number} [args.skip]
 * @param {number} [args.limit]
 * @returns {Promise.<number>}
 */
module.exports = async function({ skip = null, limit = null } = {}) {
  const context = this
  skip = skip || (await context.getSkip())
  limit = limit || (await context.getLimit())

  return (skip / limit) % 1 === 0 ? Math.ceil(skip / limit) + 1 : Math.ceil(skip / limit)
}
