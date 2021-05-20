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
 * @param {boolean} [args.canUseAggregate]
 * @param {string} [args.search]
 * @returns {Promise.<Array.<resource>>}
 */
module.exports = async function({
  setCollection = true,
  force = false,
  filters = null,
  skip = null,
  limit = null,
  sort = null,
  filtersMeta = null,
  canUseAggregate = true,
  search = null
} = {}) {
  const context = this
  await context.hook("beforeGetCollection")

  if (!force && context.collection) {
    return context.collection
  }

  const sortResult = await context.getSort({
    defaultSort: sort,
    inputs: sort ? {} : null,
    includeRelationSorts: true,
    includeRelationsInResult: true
  })

  const filtersResult = await context.getFilters({
    includeRelationFilters: true,
    includeRelationsInResult: true
  })

  let collection = []

  let aggregateResultInstead = false
  if (canUseAggregate) {
    const loadRelations = (await context.getLoadRelations()) || []
    const randomSort = sortResult.sort[context.routeObject.meta.randomSort]
    const sortRelations = sortResult.relations || []
    const filterRelations = filtersResult.relations || []

    if (loadRelations.length || randomSort || sortRelations.length || filterRelations.length) {
      aggregateResultInstead = true
      collection = await context.getAggregateCollection({
        setCollection: false,
        sort: sortResult.sort,
        filters: filtersResult.filters,
        skip,
        search,
        force,
        limit,
        filterRelations,
        sortRelations
      })
    }
  }

  if (!aggregateResultInstead) {
    sort = sortResult.sort
    filters = cast(filters).to(Object) || {}
    skip = Number(skip) || (await context.getSkip())
    limit = Number(limit) || (await context.getLimit())
    filtersMeta = cast(filtersMeta).to(Object) || undefined
    const requestFilters = filtersResult.filters

    if (!filtersMeta) {
      search = context.cast(search).to(String) || (await context.getSearch())
      if (search) {
        filtersMeta = { score: { $meta: "textScore" } }
        requestFilters.$text = { $search: search }
      }
    }

    collection = await context.model
      .find(
        {
          ...requestFilters,
          ...filters
        },
        filtersMeta
      )
      .sort(sort)
      .skip(skip)
      .limit(limit)
  }

  if (setCollection) {
    context.collection = collection
  }
  await context.hook("afterGetCollection")

  return collection
}
