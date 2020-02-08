module.exports = async function({
  setResource = true,
  setCreatedResource = true
}) {
  const context = this;
  const resource = await context.model.create(await context.getCreateInputs());
  if (setCreatedResource) {
    context.createdResource = resource;
  }
  if (setResource) {
    context.resource = resource;
  }
  return resource;
};
