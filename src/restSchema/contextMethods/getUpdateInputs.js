module.exports = async function({ setUpdateInputs = true, updateFields = null } = {}) {
  const context = this
  updateFields =
    (updateFields && (await context.getFields({ fields: updateFields, setFields: false }))) ||
    (await context.getUpdateFields())
  const updateInputs = await context.getInputsFromFields({ fields: updateFields })
  if (setUpdateInputs) {
    context.updateInputs = updateInputs
  }
  return updateInputs
}
