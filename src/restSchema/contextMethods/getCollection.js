const cast = require("../helpers/cast")

/**
 * @typedef {import("../../../typeDefs/context").resource} resource
 */

/**
 * @typedef {import("../../../typeDefs/context").context} context
 */

/**
 * @this context
 * @param {object} [args]
 * @param {boolean} [args.setCollection]
 * @param {boolean} [args.force]
 * @param {object} [args.filters]
 * @param {number} [args.skip]
 * @param {number} [args.limit]
 * @param {object} [args.sort]
 * @param {object} [args.filtersMeta]
 * @returns {Promise.<Array.<resource>>}
 */
module.exports = async function({
  setCollection = true,
  force = false,
  filters = null,
  skip = null,
  limit = null,
  sort = null,
  filtersMeta = null
} = {}) {
  const context = this
  await context.hook("beforeGetCollection")

  if (!force && context.collection) {
    return context.collection
  }

  filters = cast(filters).to(Object) || {}
  skip = Number(skip) || (await context.getSkip())
  limit = Number(limit) || (await context.getLimit())
  sort = cast(sort).to(Object) || (await context.getSort())
  filtersMeta = cast(filtersMeta).to(Object) || {}

  const collection = await context.model
    .find(
      {
        ...(await context.getFilters()),
        ...filters
      },
      filtersMeta
    )
    .sort(sort)
    .skip(skip)
    .limit(limit)

  if (setCollection) {
    context.collection = collection
  }
  await context.hook("afterGetCollection")

  return collection
}
