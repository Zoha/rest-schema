const checkMax = require("./max");
module.exports = (...args) => {
  return checkMax(...args, true);
};
