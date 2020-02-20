const isArray = require("../helpers/isArray");
const isObject = require("../helpers/isObject");
const isFunction = require("../helpers/isFunction");
const filter = require("../helpers/filter");

const getInputs = async (fields, inputs, context) => {
  if (!fields) {
    return isArray(inputs) ? [] : {};
  }
  // define object for final results
  let result = {};
  // if target should be array
  if (isArray(fields)) {
    result = [];
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

  // process each field
  // and get its value from inputs
  for (let fieldName in fields) {
    // define field and value
    const field = fields[fieldName];
    let value = context.cast(inputs[fieldName]).to(field.type || String);

    // if value have no value (undefined or null)
    // and field has a default property
    // get the default value for
    if (value == undefined && field.default) {
      if (field.default) {
        let defaultValue = field.default;
        if (isObject(defaultValue)) {
          defaultValue = field.default[context.route];
        }
        if (defaultValue) {
          if (isFunction(defaultValue)) {
            value = await defaultValue(context);
          } else {
            value = defaultValue;
          }
        }
      }
    }

    // if value have a set
    // or is an object that has set
    // then get value by the set function or set value
    if (field.set) {
      let set = field.set;
      if (isObject(set)) {
        set = field.set[context.route];
      }
      if (set) {
        if (isFunction(set) && value != null) {
          value = await set(value, context);
        } else if (!isFunction(set)) {
          value = set;
        }
      }
    }

    // if value was set and not equals to null or undefined
    // process the nested values for the field
    if (
      value != undefined &&
      field.isNested &&
      (isObject(value) || isArray(value))
    ) {
      value = await getInputs(field.children, value, context);
    }

    // add to final result
    result[fieldName] = value;
  }

  // filter values that are not undefined
  return filter(result, i => i != undefined);
};

module.exports = async function(fields) {
  const context = this;
  fields = fields || context.fields || (await context.getFields());
  return await getInputs(fields, context.inputs, context);
};
