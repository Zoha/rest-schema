module.exports = async function() {
  const context = this;
  const routeKeys = context.getRouteKeys();
  const cast = context.cast;

  const req = context.req;

  if (!req.params || !req.params.id) {
    throw new Error(validationMessages.idParamNotFound);
  }

  let filters = [];
  for (let i of routeKeys) {
    const field = await context.getNestedField(i);
    let castedValue;
    if (field) {
      castedValue = cast(req.params.id).to(field.type);
    }
    if (castedValue != undefined) {
      filters.push({
        [i]: castedValue
      });
    }
  }
  return filters;
};
