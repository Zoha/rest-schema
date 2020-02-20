module.exports = function() {
  const context = this;
  const skip = context.getSkip();
  const limit = context.getLimit();
  return Math.ceil(skip / limit);
};
