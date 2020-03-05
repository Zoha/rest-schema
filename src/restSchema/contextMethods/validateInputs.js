const filter = require("../helpers/filter");
const isArray = require("../helpers/isArray");
const isObject = require("../helpers/isObject");

const validateInputs = async (fields, inputs, context, prependKey = "") => {
  if (!fields) {
    return isArray(inputs) ? [] : {};
  }
  let validationErrors = [];

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
    // define value, validations, key
    const value = inputs[fieldKey];
    const field = fields[fieldKey];
    const key = fieldKey;

    validations = {};
    const availableValidations = [
      "required",
      "min",
      "max",
      "between",
      "minLength",
      "maxLength",
      "betweenLength",
      "match",
      "enum",
      "validate",
      "unique"
    ];

    if (typeof value == "undefined") {
      // if type of value is undefined
      // just check the required field
      validations = {
        required: field.required
      };
    } else {
      // separate validation properties in the field
      validations = filter(field, (i, k) => availableValidations.includes(k));
    }

    // do the validation
    try {
      await context.validateInput(value, validations, prependKey + key);
    } catch (e) {
      validationErrors.push({
        value,
        location: context.findLocationOfInput(key),
        field: prependKey + key,
        message: e.message
      });
    }

    // validate children
    if ((field.isNested && isArray(value)) || isObject(value)) {
      validationErrors = [
        ...validationErrors,
        ...(await validateInputs(
          field.children,
          value,
          context,
          prependKey + key + "."
        ))
      ];
    }
  }
  return validationErrors;
};

module.exports = async function({ setValidationErrors = true } = {}) {
  const context = this;
  const fields = context.fields || (await context.getFields());
  const inputs = context.inputs || (await context.getInputs());
  let validationResult = await validateInputs(fields, inputs, context);
  if (setValidationErrors) {
    context.validationErrors = validationResult;
  }
  return validationResult;
};
