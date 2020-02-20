const filter = require("../helpers/filter");
const isArray = require("../helpers/isArray");
const isObject = require("../helpers/isObject");

const sanitizeInputs = async (fields, inputs, context) => {
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
    inputs[fieldKey] = await context.sanitizeInput(value, sanitizes);

    // sanitize children
    if ((field.isNested && isArray(value)) || isObject(value)) {
      inputs[fieldKey] = await sanitizeInputs(field.children, value, context);
    }
  }
  return inputs;
};

module.exports = async function({ setInputs = true } = {}) {
  const context = this;
  const fields = context.fields || (await context.getFields());
  const inputs = context.inputs || (await context.getInputs());
  const sanitizedInputs = await sanitizeInputs(fields, inputs, context);
  if (setInputs) {
    context.inputs = sanitizedInputs;
  }
  return sanitizedInputs;
};
