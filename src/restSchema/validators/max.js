module.exports = (value, of, checkString = false) => {
  if (checkString) {
    value = value.toString();
  }
  if (typeof value == "string" && value.length > parseInt(of)) {
    return false;
  } else if (value > parseInt(of)) {
    return false;
  }
  return true;
};
