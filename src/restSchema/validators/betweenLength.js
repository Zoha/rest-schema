const checkBetween = require("./between");

module.exports = (...args) => {
  return checkBetween(...args, true);
};
