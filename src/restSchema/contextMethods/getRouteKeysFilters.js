const cast = require("../helpers/cast")
const { RestSchemaError } = require("../errors")

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
 * @typedef {import("../../../typeDefs/context").request} request
 */

/**
 * @this context
 * @param {object} [args]
 * @param {string[]} [args.routeKeys]
 * @param {request} [args.req]
 * @param {*} [args.id]
 * @param {string} [args.idKey]
 * @param {string} [args.idTarget]
 * @param {object} [args.fallbackFilters]
 * @returns {Promise.<object>}
 */
module.exports = async function({
  routeKeys = null,
  req = null,
  id = null,
  idKey = null,
  idTarget = null,
  fallbackFilters = null
} = {}) {
  const context = this
  routeKeys = cast(routeKeys).to(Array) || context.getRouteKeys()
  fallbackFilters = cast(fallbackFilters).to(Object) || context.relationFilters || null

  const messages = await context.getMessages()
  const request = cast(req).to(Object) || context.req

  idTarget = cast(idTarget).to(String) || "params"
  idKey = cast(idKey).to(String) || "id"

  if (id == null && (!request[idTarget] || !request[idTarget][idKey])) {
    if (fallbackFilters) {
      return fallbackFilters
    }
    throw new RestSchemaError(messages.idParamNotFound)
  }

  const requestId = id || request[idTarget][idKey]

  const filters = []
  const gettingFieldsPromises = routeKeys.map(i => context.getNestedField({ key: i }))

  const fields = await Promise.all(gettingFieldsPromises)
  fields.forEach(field => {
    let castedValue
    if (field) {
      castedValue = cast(requestId).to(field.type)
    }
    if (castedValue != null) {
      filters.push({
        [field.nestedKey]: castedValue
      })
    }
  })
  return filters
}
