const { ObjectId } = require("../../types");
module.exports = {
  _id: {
    type: ObjectId,
    creatable: false,
    updatable: false
  },
  createdAt: {
    type: Date,
    creatable: false,
    updatable: false
  },
  updatedAt: {
    type: Date,
    creatable: false,
    updatable: false
  }
};
