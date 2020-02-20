const isArray = require("../helpers/isArray");

module.exports = (value, of, checkString = false) => {
  if (value == undefined) {
    return false;
  }
  if (checkString) {
    if (typeof value == "number") {
      value = value.toString();
    }
    if (value.toString && value.length !== undefined) {
      value = value.length;
    } else {
      return false;
    }
  }
  if (typeof value == "string" || isArray(value)) {
    if (value.length < parseFloat(of)) {
      return false;
    }
    return true;
  } else if (value < parseFloat(of)) {
    return false;
  }
  return true;
};
