module.exports = async function({ setInputs = true } = {}) {
  const context = this;
  const inputsTarget = context.routeObject.inputsTarget || [];
  const inputs = {
    ...inputsTarget.map(i => context.req[i] || {})
  };
  if (setInputs) {
    context.inputs = inputs;
  }
  return inputs;
};
