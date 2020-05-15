const mongoose = require("./mongoose")

const schema = mongoose.Schema(
  {
    profile: {
      type: mongoose.Schema.Types.ObjectId
    },
    role: {
      type: mongoose.Schema.Types.ObjectId
    }
  },
  { timestamps: true }
)

const model = mongoose.model("User", schema)
module.exports = model
