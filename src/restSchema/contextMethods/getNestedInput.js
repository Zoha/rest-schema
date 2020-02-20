const get = require("../helpers/get");
module.exports = async function(target) {
  const context = this.context;
  const inputs = context.inputs || (await context.getInputs());
  return get(inputs, target);
};
