module.exports = function() {
  const context = this;
  let page = parseInt(context.schema.paginationMeta.page);
  const inputs = this.inputs;
  const pageKey = context.routeObject.meta.page;

  if (isNaN(page)) {
    page = undefined;
  }

  if (inputs[pageKey]) {
    page = parseInt(inputs[pageKey]);
    if (isNaN(page)) {
      page = undefined;
    }
  }
  return page;
};
