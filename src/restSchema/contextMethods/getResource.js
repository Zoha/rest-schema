const validationMessages = require("../defaults/defaultMessages");

module.exports = async function({
  errorOnNotFound = false,
  setResource = true,
  force = false,
  resourceId = null
} = {}) {
  const context = this;

  if (!force && context.resource) {
    return context.resource;
  }

  // find the resource by route keys
  let resource;
  if (resourceId != null) {
    resource = await context.model.findOne({
      _id: resourceId
    });
  } else {
    resource = await context.model.findOne({
      $or: await context.getRouteKeysFilters(),
      ...context.getCustomFilters()
    });
  }

  if (errorOnNotFound && !resource) {
    throw new Error(validationMessages.resourceNotFound);
  }

  if (setResource && !!resource) {
    context.resource = resource;
  }
  return resource;
};
