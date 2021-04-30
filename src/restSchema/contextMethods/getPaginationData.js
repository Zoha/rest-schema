const deepmerge = require("deepmerge")
const isFunction = require("../helpers/isFunction")

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

const getPaginationDataFrom = async (paginationRawData, context) => {
  let paginationData = paginationRawData
  if (isFunction(paginationRawData)) {
    paginationData = await paginationRawData(context)
  }

  for (const key in paginationData) {
    if (isFunction(paginationData[key])) {
      paginationData[key] = await paginationData[key](context)
    }
  }

  return paginationData
}

/**
 * @this context
 * @param {object} [args]
 * @param {paginationProps} [pagination]
 * @param {boolean} [args.setResource]
 * @param {boolean} [args.force]
 * @returns {Promise.<object>}
 */
module.exports = async function({ pagination = null, setResource = true, force = false } = {}) {
  const context = this
  const { routeObject } = context
  const schemaPaginationRaw = context.cast(pagination).to(Object) || context.schema.pagination

  const schemaPagination = await getPaginationDataFrom(schemaPaginationRaw, context)
  const routePagination = await getPaginationDataFrom(routeObject.pagination, context)

  const paginationData = deepmerge(schemaPagination, routePagination)

  if (setResource || force) {
    context.pagination = paginationData
  }

  return paginationData
}
