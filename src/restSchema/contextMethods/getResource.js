const validationMessages = require("../defaults/defaultMessages")
const cast = require("../helpers/cast")

module.exports = async function({
  errorOnNotFound = false,
  setResource = true,
  force = false,
  resourceId = null,
  model = null,
  filters = null
} = {}) {
  const context = this

  model = model || context.model
  filters = cast(filters).to(Object) || {}

  await context.hook("beforeGetResource")

  if (!force && context.resource) {
    return context.resource
  }

  // find the resource by route keys
  let resource
  if (resourceId != null) {
    resource = await model.findOne({
      _id: resourceId
    })
  } else {
    let getRouteKeysFilters = await context.getRouteKeysFilters()
    if (!getRouteKeysFilters.length) {
      getRouteKeysFilters = [
        {
          _id: null
        }
      ]
    }
    resource = await model.findOne({
      $or: getRouteKeysFilters,
      ...(await context.getCustomFilters()),
      ...filters
    })
  }

  if (errorOnNotFound && !resource) {
    throw new Error(validationMessages.resourceNotFound)
  }

  if (setResource && !!resource) {
    context.resource = resource
  }
  await context.hook("afterGetResource")

  return resource
}
