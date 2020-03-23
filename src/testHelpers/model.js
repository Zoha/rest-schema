const mongoose = require("./mongoose")

const { Mixed } = mongoose.Schema.Types

const schema = mongoose.Schema(
  {
    prop1: Mixed,
    prop2: Mixed,
    prop3: Mixed,
    prop4: Mixed,
    prop5: Mixed
  },
  { timestamps: true }
)

const model = mongoose.model("TestModelRS", schema)
module.exports = model
