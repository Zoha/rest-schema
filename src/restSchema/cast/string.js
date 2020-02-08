module.exports = function castString(value, path) {
  // If null or undefined
  if (value == null) {
    return value;
  }

  // handle documents being passed
  if (value._id && typeof value._id === "string") {
    return value._id;
  }

  // Re: gh-647 and gh-3030, we're ok with casting using `toString()`
  // **unless** its the default Object.toString, because "[object Object]"
  // doesn't really qualify as useful data
  if (
    value.toString &&
    value.toString !== Object.prototype.toString &&
    !Array.isArray(value)
  ) {
    return value.toString();
  }

  return null;
};
