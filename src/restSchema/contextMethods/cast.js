const cast = require("../helpers/cast")

/**
 *
 * @param {*} val - value to cast
 * @returns {Cast|null}
 */
module.exports = function(...args) {
  return cast(...args)
}
