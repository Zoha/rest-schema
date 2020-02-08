const isArray = require("../helpers/isArray");
const isObject = require("../helpers/isObject");
const isFunction = require("../helpers/isObject");
const filter = require("../helpers/filter");

const getValues = async (fields, values, context) => {
  if (!fields) {
    return isArray(values) ? [] : {};
  }
  // define object for final results
  let result = {};
  // if target should be array
  if (isArray(fields)) {
    result = [];
  }

  // if type of fields are array
  // and count of fields are lower that values
  // add fields item to equal length of the values
  if (isArray(fields) && fields.length < values.length) {
    let specifiedCount = fields.length;
    let loopCount = Math.ceil((values.length - fields.length) / specifiedCount);
    for (let i = 0; i < loopCount; i++) {
      fields = [...fields, ...fields.slice(0, specifiedCount)];
    }
    fields = fields.slice(0, values.length);
  }

  // process each field
  // and get its value from values
  for (let fieldName in fields) {
    // define field and value
    const field = fields[fieldName];
    let value = context.cast(values[fieldName]).to(field.type || String);

    // check that field not be hided
    // if field was hided send loop
    // to next cycle
    let hide = field.hide;
    if (isObject(field.hide)) {
      hide = field.hide[context.route];
    }
    if (hide) {
      if (isFunction(hide)) {
        if (!(await hide(context))) {
          continue;
        }
      } else {
        continue;
      }
    }

    // if value have a get
    // or is an object that has get
    // then get value by the get function or get value
    if (field.get) {
      let get = field.get;
      if (isObject(get)) {
        get = field.get[context.route];
      }
      if (get) {
        if (isFunction(get) && value != null) {
          value = await get(value, context);
        } else if (!isFunction(get)) {
          value = get;
        }
      }
    }

    // if value was get and not equals to null or undefined
    // process the nested values for the field
    if (
      typeof value != undefined &&
      field.isNested &&
      (isObject(value) || isArray(value))
    ) {
      value = await getValues(field.children, value, context);
    }

    // add to final result
    result[fieldName] = value;
  }

  // filter values that are not undefined
  return filter(result, i => i != undefined);
};

module.exports = async function(fields, resource) {
  const context = this;
  fields = fields || context.fields;
  resource = resource || context.resource || {};
  return await getValues(fields, resource, context);
};
