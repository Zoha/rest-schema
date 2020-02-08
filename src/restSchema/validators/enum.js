module.exports = (value, validItems) => {
  if (validItems.includes(value)) {
    return true;
  }
  return false;
};
