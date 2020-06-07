const { defaultField } = require("../defaults")
const cast = require("../helpers/cast")

module.exports = (newField, { target = defaultField } = {}) => {
  newField = cast(newField).to(Object)
  if (!newField) {
    return
  }
  Object.entries(newField).forEach(([key, value]) => {
    target[key] = value
  })
}
