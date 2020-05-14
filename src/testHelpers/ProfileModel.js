const mongoose = require("./mongoose")

const schema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId
    }
  },
  { timestamps: true }
)

const model = mongoose.model("Profile", schema)
module.exports = model
