module.exports = async function({
  setDeletedResource = true
} = {}) {
  const context = this;
  let resource = await context.getResource();

  await context.model.findOneAndDelete(
    {
      $or: await context.getRouteKeysFilters(),
      ...context.getCustomFilters()
    }
  );

  if (setDeletedResource) {
    context.deletedResource = resource;
  }
  return resource;
};
