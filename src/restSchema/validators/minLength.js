const checkMin = require("./min");

module.exports = (...args) => {
  return checkMin(...args, true);
};
