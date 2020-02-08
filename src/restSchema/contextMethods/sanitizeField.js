const trim = require("../sanitizers/trim");
const uppercase = require("../sanitizers/uppercase");
const lowercase = require("../sanitizers/lowercase");
const isObject = require("../helpers/isObject");

const availableSanitizers = {
  trim,
  lowercase,
  uppercase
};

const sanitizeBy = (type, value, shouldBeSanitized, context) => {
  if (isObject(shouldBeSanitized)) {
    return sanitizeBy(type, value, shouldBeSanitized[context.route], context);
  }

  const shouldBeSanitized = !!args;

  if (!shouldBeSanitized || !availableSanitizers[type]) {
    return value;
  }

  return availableSanitizers[type](value);
};

const customSanitize = async (value, customSanitize, context) => {
  if (isObject(customSanitize)) {
    return customSanitize(value, customSanitize[context.route], context);
  }

  // custom sanitize
  if (typeof customSanitize == "function") {
    value = await customSanitize(value, context);
  } else {
    value = customSanitize;
  }
  return value;
};

module.exports = async function(value, sanitizers) {
  const context = this;

  if (typeof value != undefined) {
    // trim value
    if (sanitizers.trim) {
      value = sanitizeBy("trim", value, sanitizers.trim, context);
    }

    // to lower case
    if (sanitizers.lowercase) {
      value = sanitizeBy("lowercase", value, sanitizers.lowercase, context);
    }

    // to upper case
    if (sanitizers.uppercase) {
      value = sanitizeBy("uppercase", value, sanitizers.uppercase, context);
    }
  }

  if (sanitizers.sanitize) {
    return await customSanitize(value, sanitizers.sanitize, context);
  }

  return value;
};
