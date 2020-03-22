module.exports = async function({
  setResource = true,
  setCreatedResource = true,
  inputs = null
} = {}) {
  const context = this

  await context.hook("beforeCreateResource")

  const createInputs = context.cast(inputs).to(Object) || (await context.getCreateInputs())
  const resource = await context.model.create(createInputs)
  if (setCreatedResource) {
    context.createdResource = resource
  }
  if (setResource) {
    context.resource = resource
  }
  await context.hook("afterCreateResource")
  return resource
}
