const { ObjectId } = require("mongodb")

/**
 *
 * @param {*} val - value to cast
 * @returns {ObjectId|null}
 */
module.exports = function castObjectId(value) {
  if (value == null) {
    return value
  }

  if (value instanceof ObjectId) {
    return value
  }

  // eslint-disable-next-line no-underscore-dangle
  const idOfValue = value._id
  if (idOfValue) {
    if (idOfValue instanceof ObjectId) {
      return idOfValue
    }
    if (idOfValue.toString instanceof Function) {
      if (!ObjectId.isValid(idOfValue.toString())) {
        return null
      }
      return new ObjectId(idOfValue.toString())
    }
  }

  if (value.toString instanceof Function) {
    if (!ObjectId.isValid(value.toString())) {
      return null
    }
    return new ObjectId(value.toString())
  }

  return null
}
