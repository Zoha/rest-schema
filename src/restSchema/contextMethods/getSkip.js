const getPage = function(context) {
  let page = parseInt(context.schema.pagination.page);
  const inputs = context.inputs;
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

module.exports = function() {
  const context = this;
  let skip = parseInt(context.schema.pagination.skip);
  const inputs = this.inputs;
  const skipKey = context.routeObject.meta.skip;
  const page = getPage(context);
  const limit = context.getLimit();

  if (isNaN(skip)) {
    skip = 0;
  }

  if (inputs[skipKey]) {
    skip = parseInt(inputs[skipKey]);
    if (isNaN(skip)) {
      skip = 0;
    }
  } else if (page) {
    skip = (page - 1) * limit;
    if (isNaN(skip)) {
      skip = 0;
    }
  }
  return skip;
};
