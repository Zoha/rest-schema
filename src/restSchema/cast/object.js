module.exports = val => {
  if (val == undefined) {
    return null;
  }
  return typeof val == "object" ? val : {};
};
