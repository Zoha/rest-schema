const validationMessages = require("../defaults/defaultMessages")
const cast = require("../helpers/cast")
const deepMergeFilters = require("../helpers/deepMergeFilters")

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
    let getRouteKeysFilters = {
      $or: await context.getRouteKeysFilters()
    }
    if (!getRouteKeysFilters.$or.length) {
      getRouteKeysFilters = {}
    }
    let finalFilters = deepMergeFilters([
      getRouteKeysFilters,
      await context.getCustomFilters(),
      filters
    ])
    if (Object.keys(finalFilters).length) {
      resource = await model.findOne(finalFilters)
    }
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
