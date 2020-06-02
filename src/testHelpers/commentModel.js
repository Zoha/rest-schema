const mongoose = require("./mongoose")

const schema = mongoose.Schema(
  {
    body: String,
    user: mongoose.Schema.Types.ObjectId
  },
  { timestamps: true }
)

const model = mongoose.model("Comment", schema)
module.exports = model
