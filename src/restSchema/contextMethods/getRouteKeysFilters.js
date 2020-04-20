const defaultMessages = require("../defaults/defaultMessages")
const cast = require("../helpers/cast")

module.exports = async function({
  routeKeys = null,
  req = null,
  id = null,
  idKey = null,
  idTarget = null
} = {}) {
  const context = this
  const targetRouteKeys = routeKeys || context.getRouteKeys()

  const request = req || context.req

  const requestIdTarget = idTarget || "params"
  const requestIdKey = idKey || "id"

  if (id == null && (!request.params || !request[requestIdTarget][requestIdKey])) {
    throw new Error(defaultMessages.idParamNotFound)
  }

  const requestId = id || request[requestIdTarget][requestIdKey]

  const filters = []
  const gettingFieldsPromises = targetRouteKeys.map(i => context.getNestedField(i))

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
