module.exports = async (value, args, key, context) => {
  const findedResource = await context.model.findOne({
    [key]: value
  });
  if (findedResource) {
    return false;
  }
  return true;
};
