const cloneDeep = require("clone-deep");
const isObject = require("../helpers/isObject");
const isFunction = require("../helpers/isFunction");
const isBoolean = require("../helpers/isBoolean");

const getUpdatableFields = async (fields, context) => {
  if (!fields) {
    return {};
  }
  let updatableFields = {};
  // process each field
  for (let fieldKey in fields) {
    let field = fields[fieldKey];

    // check field updatable property
    // that specified for this route
    if (isObject(field.updatable) && field.updatable[context.route]) {
      // if updatable was a function
      // and that function returns true
      if (
        isFunction(field.updatable[context.route]) &&
        (await field.updatable[context.route](context))
      ) {
        updatableFields[fieldKey] = field;
      }

      // else check updatable value
      else {
        updatableFields[fieldKey] = field;
      }
    } else if (
      isFunction(field.updatable) &&
      (await field.updatable(context))
    ) {
      updatableFields[fieldKey] = field;
    } else if (isBoolean(field.updatable) && field.updatable !== false) {
      // if updatable is boolean
      // and its value is true
      updatableFields[fieldKey] = field;
    }

    // if field is nested process children and filter them too
    // but do this just if parent currently is added to fields
    if (updatableFields[fieldKey] && field.isNested) {
      if (!field.children && field.isArrayNested) {
        updatableFields[fieldKey].children = [];
      } else {
        updatableFields[fieldKey].children = await getUpdatableFields(
          field.children,
          context
        );
      }
    }
  }

  return updatableFields;
};

module.exports = async function() {
  const context = this;
  const originalFields = context.fields;
  let fields = cloneDeep(originalFields);
  return await getUpdatableFields(fields);
};
