const mongoose = require("./mongoose")

const schema = mongoose.Schema(
  {
    name: String
  },
  { timestamps: true }
)

const model = mongoose.model("Permission", schema)
module.exports = model
