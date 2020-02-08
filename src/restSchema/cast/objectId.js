const ObjectId = require("mongoose").Types.ObjectId;

module.exports = function castObjectId(value) {
  if (value == null) {
    return value;
  }

  if (value instanceof ObjectId) {
    return value;
  }

  if (value._id) {
    if (value._id instanceof ObjectId) {
      return value._id;
    }
    if (value._id.toString instanceof Function) {
      if (!ObjectId.isValid(value._id.toString())) {
        return null;
      }
      return new ObjectId(value._id.toString());
    }
  }

  if (value.toString instanceof Function) {
    if (!ObjectId.isValid(value.toString())) {
      return null;
    }
    return new ObjectId(value.toString());
  }

  return null;
};
