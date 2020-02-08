const mongoose = require("mongoose");
module.exports = model => {
  if (typeof model == "string") {
    return mongoose.model(model);
  } else if (model instanceof mongoose.Model) {
    return model;
  }
  throw new Error("model is invalid");
};
