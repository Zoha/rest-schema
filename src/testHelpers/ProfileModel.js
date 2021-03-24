const mongoose = require("./mongoose")

const schema = new mongoose.Schema({ name: String, field: String }, { timestamps: true })

const model = mongoose.model("Profile", schema)
module.exports = model
