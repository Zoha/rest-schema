module.exports = function castBoolean(value, path) {
  if (module.exports.convertToTrue.has(value)) {
    return true;
  }
  if (module.exports.convertToFalse.has(value)) {
    return false;
  }
  return !!value;
};

module.exports.convertToTrue = new Set([true, "true", 1, "1", "yes"]);
module.exports.convertToFalse = new Set([false, "false", 0, "0", "no", null]);
