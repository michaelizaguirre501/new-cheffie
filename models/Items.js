const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Items", ItemSchema);
