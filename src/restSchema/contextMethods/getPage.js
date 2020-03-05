module.exports = function() {
  const context = this;
  const skip = context.getSkip();
  const limit = context.getLimit();

  return (skip / limit) % 1 == 0
    ? Math.ceil(skip / limit) + 1
    : Math.ceil(skip / limit);
};
