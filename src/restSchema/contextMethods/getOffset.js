module.exports = function() {
  const context = this;
  let offset = parseInt(context.schema.paginationMeta.offset);
  const inputs = this.inputs;
  const offsetKey = context.routeObject.meta.offset;
  const page = context.getPage();
  const limit = context.getLimit();

  if (isNaN(offset)) {
    offset = 0;
  }

  if (inputs[offsetKey]) {
    offset = parseInt(inputs[offsetKey]);
    if (isNaN(offset)) {
      offset = 0;
    }
  } else if (page) {
    offset = (page - 1) * limit;
    if (isNaN(offset)) {
      offset = 0;
    }
  }
  return offset;
};
