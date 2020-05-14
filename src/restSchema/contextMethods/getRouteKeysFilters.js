const defaultMessages = require("../defaults/defaultMessages")
const cast = require("../helpers/cast")

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

  const request = cast(req).to(Object) || context.req

  idTarget = cast(idTarget).to(String) || "params"
  idKey = cast(idKey).to(String) || "id"

  if (id == null && (!request[idTarget] || !request[idTarget][idKey])) {
    if (fallbackFilters) {
      return fallbackFilters
    }
    throw new Error(defaultMessages.idParamNotFound)
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
