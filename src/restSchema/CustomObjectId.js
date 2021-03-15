const mongoose = require("mongoose")
const { ObjectId: MongooseSchemaObjectId } = mongoose.Schema.Types
const { ObjectId } = mongoose.Types

const RestSchemaObjectId = function(val) {
  if (val) {
    return ObjectId(val)
  }
}

RestSchemaObjectId.prototype = Object.create(MongooseSchemaObjectId.prototype)
RestSchemaObjectId.prototype.isValid = ObjectId.isValid
RestSchemaObjectId.prototype.createFromHexString = ObjectId.createFromHexString
RestSchemaObjectId.prototype.createFromTime = ObjectId.createFromTime
RestSchemaObjectId.prototype.generate = ObjectId.generate
RestSchemaObjectId.prototype.cacheHexString = ObjectId.cacheHexString

module.exports = RestSchemaObjectId
