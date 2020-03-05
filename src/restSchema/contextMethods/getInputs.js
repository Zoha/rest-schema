module.exports = async function({ setInputs = true } = {}) {
  const context = this;
  const inputsTarget = context.routeObject.inputsTarget || [];
  let inputs = {};
  for (let target of inputsTarget) {
    if (!context.req[target]) {
      continue;
    }
    inputs = { ...inputs, ...context.req[target] };
  }
  if (setInputs) {
    context.inputs = inputs;
  }
  return inputs;
};
