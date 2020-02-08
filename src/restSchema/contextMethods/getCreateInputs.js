module.exports = async function({ setCreateInputs = true }) {
  const context = this;
  const createFields = await context.getCreateFields();
  const createInputs = await context.getInputsFromFields(createFields);
  if (setCreateInputs) {
    context.createInputs = createInputs;
  }
  return createInputs;
};
