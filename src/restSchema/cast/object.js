module.exports = val => {
  return typeof val == "object" ? val : {};
};
