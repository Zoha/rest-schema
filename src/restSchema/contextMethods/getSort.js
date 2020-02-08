module.exports = function() {
  const context = this;
  const inputs = context.inputs;
  const sortKey = context.routeObject.meta.sort || "sort";
  let sort = context.schema.paginationMeta.sort;
  if (inputs[sortKey]) {
    let sortsArray = [];
    let requestedSorts = inputs[sortKey].split(" ");
    for (let requestedSort of requestedSorts) {
      if (!requestedSort) {
        continue;
      }
      // if type of field not found return undefined
      const field = context.getNestedField(key);
      if (field == null || !field.sortable) {
        continue;
      }

      let orderOperator = "";
      if (/^\-/.test(requestedSort)) {
        orderOperator = "-";
      }
      sortsArray.push(orderOperator + requestedSort.replace(/^\-/, ""));
    }
    sort = sortsArray.join(" ");
  }
  return sort;
};
