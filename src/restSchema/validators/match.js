module.exports = (value, match) => {
  if (typeof value == "number") {
    value = value.toString();
  }
  if (typeof value != "string") {
    return false;
  }
  if (match instanceof RegExp) {
    return match.test(value);
  }
  if (typeof match == "string") {
    return new RegExp(match).test(value);
  }
  return false;
};
