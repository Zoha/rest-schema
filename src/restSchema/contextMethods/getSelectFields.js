const isArray = require("../helpers/isArray");
const isObject = require("../helpers/isObject");
const isFunction = require("../helpers/isFunction");
const filter = require("../helpers/filter");
const cloneDeep = require("clone-deep");

const getFields = async (
  fields,
  values,
  context,
  selectFields,
  hideByDefault = false
) => {
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
    let include = !hideByDefault;

    // if fields should be hided
    // so this fields should not be selected
    let hide = field.hide;
    if (isObject(field.hide)) {
      hide = field.hide[context.route];
    }
    if (hide) {
      if (isFunction(hide)) {
        if (await hide(context)) {
          continue;
        }
      } else {
        continue;
      }
    }

    // check for hide by default
    let schemaHideByDefault = field.hideByDefault;
    if (isObject(field.hideByDefault)) {
      schemaHideByDefault = field.hideByDefault[context.route];
    }
    if (schemaHideByDefault) {
      if (isFunction(schemaHideByDefault)) {
        if (await schemaHideByDefault(context)) {
          include = false;
        }
      } else {
        include = false;
      }
    }

    // check that exists in selected
    // if yes so check that selected should be hide or not
    const thisFieldInSelectFields = selectFields.filter(
      i => i.field.fieldUniqueKey == field.fieldUniqueKey
    )[0];

    if (thisFieldInSelectFields) {
      if (thisFieldInSelectFields.shouldBeHided == true) {
        continue;
      } else {
        include = true;
      }
    }

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
      field.children = await getFields(
        field.children,
        value,
        context,
        selectFields,
        hideByDefault
      );

      if (Object.values(field.children).length) {
        include = true;
      }
    }

    if (include) {
      // add to final result
      result[fieldName] = field;
    }
  }

  // filter values that are not undefined
  return filter(result, i => i != undefined);
};

const getSelectFields = async context => {
  // get all fields that are specified in the inputs.selectKey
  // return array of select fields in format of like
  // { fields : object , shouldBeHided : boolean}
  const inputs = context.inputs || (await context.getInputs());
  const selectInputKey = context.routeObject.meta.select || "select";
  const selectInput = inputs[selectInputKey];
  if (!selectInput) {
    return false;
  }
  const arrayOfSelectInput =
    typeof selectInput == "object"
      ? selectInput
      : typeof selectInput == "string"
      ? selectInput.split(" ")
      : [];
  const selectFields = [];
  for (let fieldKey in arrayOfSelectInput) {
    let field = arrayOfSelectInput[fieldKey];
    let shouldBeHided = false;
    if (typeof field == "string") {
      shouldBeHided = field.startsWith("-");
      field = field.replace(/^[\-\+]?/, "");
    } else {
      shouldBeHided = field == 1 ? true : false;
      field = fieldKey;
    }
    selectFields.push({
      field: await context.getNestedField(field),
      shouldBeHided
    });
  }
  return selectFields;
};

module.exports = async function(defaultResource) {
  const context = this;
  let fields = context.fields || (await context.getFields());
  fields = cloneDeep(fields);
  const resource = defaultResource || context.resource || {};

  // get fields that are specified in select input
  // this values can be for hiding the field
  // or display it
  let selectFields = await getSelectFields(context);

  // if select fields is false
  // or route object is not selectable
  // sor selectFields should be empty
  if (selectFields == false || !context.routeObject.selectable) {
    selectFields = [];
  }

  // if selectable fields has any item without -
  // so hide by default should be true
  let hideByDefault = !!selectFields.filter(i => i.shouldBeHided == false)
    .length;

  return await getFields(
    fields,
    resource,
    context,
    selectFields,
    hideByDefault
  );
};
