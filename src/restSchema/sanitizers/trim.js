module.exports = value => {
  if (value && value.trim) {
    return value.trim();
  }
};
