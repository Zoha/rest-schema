const validationMessages = require("../defaults/defaultMessages")

module.exports = async function({
  errorOnNotFound = false,
  setResource = true,
  force = false,
  resourceId = null,
  model = null
} = {}) {
  const context = this

  const schemaModel = model || context.model

  await context.hook("beforeGetResource")

  if (!force && context.resource) {
    return context.resource
  }

  // find the resource by route keys
  let resource
  if (resourceId != null) {
    resource = await schemaModel.findOne({
      _id: resourceId
    })
  } else {
    resource = await schemaModel.findOne({
      $or: await context.getRouteKeysFilters(),
      ...context.getCustomFilters()
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
