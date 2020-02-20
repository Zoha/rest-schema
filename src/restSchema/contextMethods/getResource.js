const validationMessages = require("../defaults/defaultMessages");

module.exports = async function({
  errorOnNotFound = false,
  setResource = true,
  force = false
} = {}) {
  const context = this;

  if (!force && context.resource) {
    return context.resource;
  }

  const routeKeys = context.getRouteKeys();
  const req = context.req;
  const cast = context.cast;

  if (!req.params || !req.params.id) {
    throw new Error(validationMessages.idParamNotFound);
  }

  const getRouteKeysFilters = async () => {
    let filters = [];
    for (let i of routeKeys) {
      const field = await context.getNestedField(i);
      let castedValue;
      if (field) {
        castedValue = cast(req.params.id).to(field.type);
      }
      if (castedValue) {
        filters.push({
          [i]: castedValue
        });
      }
    }
    return filters;
  };

  // find the resource by route keys
  const resource = await context.model.findOne({
    $or: await getRouteKeysFilters(),
    ...context.getCustomFilters()
  });

  if (errorOnNotFound && !resource) {
    throw new Error(validationMessages.resourceNotFound);
  }

  if (setResource && !!resource) {
    context.resource = resource;
  }
  return resource;
};
