module.exports = function() {
  const context = this;
  let limit = parseInt(context.schema.paginationMeta.limit);
  let defaultLimit = limit;
  const inputs = this.inputs;
  const limitKey = context.routeObject.meta.limit;
  const { maxLimit, minLimit } = context.routeObject.paginationMeta;

  if (isNaN(limit)) {
    limit = defaultLimit = 10;
  }

  if (inputs[limitKey]) {
    limit = parseInt(inputs[limitKey]);
    if (limit > maxLimit || limit < minLimit) {
      limit = defaultLimit;
    }
    if (isNaN(limit)) {
      limit = 10;
    }
  }
  return limit;
};
