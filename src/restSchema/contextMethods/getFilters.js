const filter = require("../helpers/filter");
const isObject = require("../helpers/isObject");
const isArray = require("../helpers/isArray");

module.exports = async function() {
  const context = this;
  const inputs = context.inputs;
  const operators = context.routeObject.filteringOperators;
  const defaultFilters = context.schema.paginationMeta.defaultFilters;
  const customFilters = context.schema.filters;

  const formatFilters = (key, value) => {
    let logic, filterValue, hasOperator, type;

    // if type of field not found return undefined
    const field = context.getNestedField(key);
    if (field == null || !field.filterable) {
      return undefined;
    }
    type = field.type;

    // change hasOperator if string
    // starts with an operator
    for (let operator in operators) {
      if (value.startsWith(operator)) {
        hasOperator = true;
        break;
      }
    }

    // if string has operator
    // split each operator sentence
    // and push its filter that returned from
    // handler to the filterValue
    if (hasOperator) {
      let regex = new RegExp("(" + Object.keys(operators).join("|") + ")", "g");
      let operatorSections = value.replace(regex, "$1{$SP$}").split("{$SP$}");

      if (operatorSections.length > 1) {
        filterValue = [];

        logic = operatorSections[0].endsWith("|") ? "$or" : "$and";

        if (logic == "$or") {
          operatorSections = operatorSections.map(i => i.replace(/\]$/, ""));
        }
      }

      // get value and the operator in each operator section
      // and call its handler to get the value
      for (let section of operatorSections) {
        let result = /(\$[^:]+:)(.*)/.exec(section);
        operator = result[1];
        value = result[2];
        if (operators[operator]) {
          if (logic) {
            filterValue.push(operators[operator](value, key));
          } else {
            filterValue = operators[operator];
          }
        }
      }
    } else {
      filterValue = value;
    }

    return logic ? { [logic]: filterValue } : filterValue;
  };

  // separate inputs that are not meta
  // like select, sort, page, ...
  let notMetaInputs = filter(
    inputs,
    (i, k) => !Object.values(context.routeObject.meta).includes(k)
  );

  let requestFilters = {};
  for (let inputKey in notMetaInputs) {
    if (inputKey == "$or") {
      if (!isArray(notMetaInputs[inputKey])) {
        continue;
      }

      let filters = [];
      for (let key in notMetaInputs[inputKey]) {
        let filterValue = formatFilters(inputKey, notMetaInputs[inputKey][key]);
        if (filterValue != null) {
          filter.push(filterValue);
        }
      }

      if (filters.length) {
        requestFilters["$or"] = filters;
      }
    } else {
      let filterValue = formatFilters(inputKey, notMetaInputs[inputKey]);
      if (filterValue == null) {
        continue;
      }
      requestFilters[inputKey] = filterValue;
    }
  }

  return {
    ...(isObject(defaultFilters) ? defaultFilters : {}),
    ...requestFilters,
    ...(isObject(customFilters) ? customFilters : {})
  };
};
