module.exports = async function({ setUpdateInputs = true } = {}) {
  const context = this;
  const updateFields = await context.getUpdateFields();
  const updateInputs = await context.getInputsFromFields(updateFields);
  if (setUpdateInputs) {
    context.updateInputs = updateInputs;
  }
  return updateInputs;
};
