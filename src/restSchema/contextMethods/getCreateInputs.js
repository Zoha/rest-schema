module.exports = async function({ setCreateInputs = true, fields = null, inputs = null } = {}) {
  const context = this
  const createFields =
    (fields && (await context.getFields({ fields }))) ||
    context.fields ||
    (await context.getCreateFields())
  const createInputs = inputs || (await context.getInputsFromFields({ fields: createFields }))
  if (setCreateInputs) {
    context.createInputs = createInputs
  }
  return createInputs
}
