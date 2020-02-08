module.exports = async function() {
  const context = this;
  const updateFields = await context.getUpdateFields();
  const updateInputs = await context.getInputsFromFields(updateFields);
  context.updateInputs = updateInputs;
  return updateInputs;
};
