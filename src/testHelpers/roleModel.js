const mongoose = require("./mongoose")

const schema = mongoose.Schema(
  {
    name: String,
    permissions: [mongoose.Schema.Types.ObjectId]
  },
  { timestamps: true }
)

const model = mongoose.model("Role", schema)
module.exports = model
