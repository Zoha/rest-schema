const checkMin = require("./min");
const checkMax = require("./min");

module.exports = (value, [min, max], checkString = false) => {
  if (
    !checkMin(value, min, checkString) ||
    !checkMax(value, max, checkString)
  ) {
    return false;
  }
  return true;
};
