const get = require("../helpers/get");

module.exports = function(key) {
  const context = this;

  for (let target of context.routeObject.inputsTarget.reverse()) {
    if (get(context.req[target], key)) {
      return target;
    }
  }
  return null;
};
