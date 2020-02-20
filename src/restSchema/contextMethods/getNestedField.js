const isObject = require("../helpers/isObject");
const isArray = require("../helpers/isArray");

module.exports = async function(target) {
  const context = this;
  targetParts = target.split(".");
  let nestedForwardFields = context.fields || (await context.getFields());
  nestedForwardFields = { children: nestedForwardFields };
  let foundedField;
  for (let target of targetParts) {
    nestedForwardFields = nestedForwardFields.children;
    if (isObject(nestedForwardFields)) {
      if (nestedForwardFields[target] == null) {
        foundedField = undefined;
        break;
      } else {
        foundedField = nestedForwardFields[target];
        nestedForwardFields = nestedForwardFields[target];
      }
    } else if (isArray(nestedForwardFields)) {
      if (!nestedForwardFields.length || isNaN(parseInt(target))) {
        foundedField = undefined;
        break;
      } else if (nestedForwardFields.length < parseInt(target)) {
        foundedField =
          nestedForwardFields[
            (parseInt(target) % nestedForwardFields.length) - 1
          ];
        nestedForwardFields =
          nestedForwardFields[
            (parseInt(target) % nestedForwardFields.length) - 1
          ];
      } else {
        foundedField = nestedForwardFields[target];
        nestedForwardFields = nestedForwardFields[target];
      }
    } else {
      foundedField = undefined;
      break;
    }
  }

  return foundedField;
};
