const filter = require("../helpers/filter");
const isArray = require("../helpers/isArray");
const isObject = require("../helpers/isArray");

const validateFields = async (fields, inputs, context, prependKey = "") => {
  if (!fields) {
    return isArray(inputs) ? [] : {};
  }
  const validationErrors = [];

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
      "validate"
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
      await context.validateField(value, validations, key);
    } catch (e) {
      validationErrors.push({
        value,
        location: findLocationOfField(key),
        param: prependKey + key
      });
    }

    // validate children
    if ((field.isNested && isArray(value)) || isObject(value)) {
      validationErrors = [
        ...validationErrors,
        ...(await validateFields(field.children, value, prependKey + key + "."))
      ];
    }
  }
};

module.exports = async function() {
  const context = this;
  validateFields(context.fields, context.inputs, context);
};
