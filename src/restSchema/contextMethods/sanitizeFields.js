const filter = require("../helpers/filter");
const isArray = require("../helpers/isArray");
const isObject = require("../helpers/isArray");

const sanitizeFields = async (fields, inputs, context, prependKey = "") => {
  if (!fields) {
    return isArray(inputs) ? [] : {};
  }
  // if type of fields are array
  // and count of fields are lower that inputs
  // add fields item to equal length of the inputs
  if (isArray(fields) && fields.length < inputs.length) {
    let specifiedCount = fields.length;
    let loopCount = Math.ceil((inputs.length - fields.length) / specifiedCount);
    for (let i = 0; i < loopCount; i++) {
      fields = [...fields, ...fields.slice(0, specifiedCount)];
    }
    fields = fields.slice(0, inputs.length);
  }

  for (let fieldKey in fields) {
    const value = inputs[fieldKey];
    const field = fields[fieldKey];
    const key = fieldKey;

    sanitizes = {};
    const availableSanitizes = ["sanitize", "trim", "lowercase", "uppercase"];

    // separate sanitization properties in the field
    sanitizes = filter(field, (i, k) => availableSanitizes.includes(k));

    // do the sanitization
    inputs[fieldKey] = await context.sanitizeField(value, sanitizes);

    // sanitize children
    if ((field.isNested && isArray(value)) || isObject(value)) {
      inputs[fieldKey] = await sanitizeFields(
        field.children,
        value,
        prependKey + key + "."
      );
    }
  }
  return inputs;
};

module.exports = async function() {
  const context = this;
  context.inputs = sanitizeFields(context.fields, context.inputs, context);
};
