module.exports = async function({
  setResource = true,
  setUpdatedResource = true
} = {}) {
  const context = this;
  let resource = await context.getResource();

  await context.model.findOneAndUpdate(
    {
      $or: await context.getRouteKeysFilters(),
      ...context.getCustomFilters()
    },
    await context.getUpdateInputs()
  );

  resource = await context.getResource({
    setResource: setResource,
    errorOnNotFound: true,
    force: true,
    resourceId: resource._id
  });

  if (setUpdatedResource) {
    context.updatedResource = resource;
  }
  return resource;
};
