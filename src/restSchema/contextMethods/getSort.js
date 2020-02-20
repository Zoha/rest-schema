module.exports = async function() {
  const context = this;
  const inputs = context.inputs || (await context.getInputs());
  const sortKey = context.routeObject.meta.sort || "sort";
  let sort = context.schema.pagination.sort;
  if (inputs[sortKey] && typeof inputs[sortKey] == "string") {
    let sortsObject = {};
    let requestedSorts = inputs[sortKey].split(" ");
    for (let requestedSort of requestedSorts) {
      if (!requestedSort) {
        continue;
      }
      let requestedSortKey = requestedSort.replace(/^\-/, "");
      // if type of field not found return undefined
      const field = await context.getNestedField(requestedSortKey);

      if (field == null || !field.sortable) {
        continue;
      }

      if (
        typeof field.sortable == "function" &&
        !(await field.sortable(context))
      ) {
        continue;
      }

      let orderOperator = 1;
      if (/^\-/.test(requestedSort)) {
        orderOperator = -1;
      }
      sortsObject[requestedSortKey] = orderOperator;
    }
    sort = sortsObject;
  }
  return sort;
};
