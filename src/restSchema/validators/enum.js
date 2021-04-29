const cast = require("../helpers/cast")

module.exports = (value, validItems) => {
  const target = cast(validItems).to(Array)
  if (target.includes(value)) {
    return true
  }
  return false
}
