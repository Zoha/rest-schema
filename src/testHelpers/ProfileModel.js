const mongoose = require("./mongoose")

const schema = mongoose.Schema({ name: String }, { timestamps: true })

const model = mongoose.model("Profile", schema)
module.exports = model
