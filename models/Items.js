const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  desc: {
    type: String,
  },
  ingredients: {
    type: String,
  },
  course: {
    type: String,
  },
});

module.exports = mongoose.model("Items", ItemSchema);
