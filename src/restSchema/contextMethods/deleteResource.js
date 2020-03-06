module.exports = async function({ setDeletedResource = true } = {}) {
  const context = this;

  await context.hook("beforeDeleteResource");

  let resource = await context.getResource();

  await context.model.findOneAndDelete({
    $or: await context.getRouteKeysFilters(),
    ...context.getCustomFilters()
  });

  if (setDeletedResource) {
    context.deletedResource = resource;
  }
  await context.hook("afterDeleteResource");

  return resource;
};
