module.exports = val => {
  if (val == undefined) {
    return null;
  }
  return Array.isArray(val) ? val : [];
};
