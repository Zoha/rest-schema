module.exports = async function({
  setResource = true,
  setUpdatedResource = true
} = {}) {
  const context = this;
  if (!context.resource || !context.resource instanceof context.model) {
    await context.getResource({ errorOnNotFound: true });
  }

  await context.resource.updateOne(await context.getUpdateInputs());

  const resource = await context.getResource({
    setResource: setResource,
    errorOnNotFound: true
  });

  if (setUpdatedResource) {
    context.updatedResource = resource;
  }
  return resource;
};
