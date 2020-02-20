const cloneDeep = require("clone-deep");
const isObject = require("../helpers/isObject");
const isArray = require("../helpers/isArray");
const isFunction = require("../helpers/isFunction");
const isBoolean = require("../helpers/isBoolean");

const getCreatableFields = async (fields, context) => {
  if (!fields) {
    return {};
  }
  let creatableFields = {};
  if (isArray(fields)) {
    creatableFields = [];
  }
  // process each field
  for (let fieldKey in fields) {
    let field = fields[fieldKey];

    // check field creatable property
    // that specified for this route
    if (isObject(field.creatable) && field.creatable[context.route]) {
      // if creatable was a function
      // and that function returns true
      if (
        isFunction(field.creatable[context.route]) &&
        (await field.creatable[context.route](context))
      ) {
        creatableFields[fieldKey] = field;
      }

      // else check creatable value
      else {
        creatableFields[fieldKey] = field;
      }
    } else if (
      isFunction(field.creatable) &&
      (await field.creatable(context))
    ) {
      creatableFields[fieldKey] = field;
    } else if (isBoolean(field.creatable) && field.creatable !== false) {
      // if creatable is boolean
      // and its value is true
      creatableFields[fieldKey] = field;
    }

    // if field is nested process children and filter them too
    // but do this just if parent currently is added to fields
    if (creatableFields[fieldKey] && field.isNested) {
      if (!field.children && field.isArrayNested) {
        creatableFields[fieldKey].children = [];
      } else {
        creatableFields[fieldKey].children = await getCreatableFields(
          field.children,
          context
        );
      }
    }
  }

  return creatableFields;
};

module.exports = async function() {
  const context = this;
  const originalFields = context.fields || (await context.getFields());
  let fields = cloneDeep(originalFields);
  return await getCreatableFields(fields);
};
