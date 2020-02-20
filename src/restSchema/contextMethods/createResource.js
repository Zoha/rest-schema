module.exports = async function({
  setResource = true,
  setCreatedResource = true
} = {}) {
  const context = this;

  const createInputs = await context.getCreateInputs();
  const resource = await context.model.create(createInputs);
  if (setCreatedResource) {
    context.createdResource = resource;
  }
  if (setResource) {
    context.resource = resource;
  }
  return resource;
};
