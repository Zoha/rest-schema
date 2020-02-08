const validationMessages = require("../defaults/defaultMessages");

module.exports = async function({
  errorOnNotFound = false,
  setResource = true
}) {
  const context = this;
  const routeKeys = context.getRouteKeys();
  const req = context.req;
  const fields = context.schema.fields;
  const cast = context.cast;

  if (!req.params.id) {
    throw new Error(validationMessages.idParamNotFound);
  }

  // find the resource by route keys
  const resource = await model.findOne({
    $or: routeKeys.map(i => ({
      [i]: cast(req.params.id).to(fields[i] ? fields[i].type || String : String)
    })),
    ...context.getRouteFilters()
  });

  if (errorOnNotFound && !context.resource) {
    throw new Error(validationMessages.resourceNotFound);
  }

  if (setResource) {
    context.resource = resource;
  }
  return resource;
};
