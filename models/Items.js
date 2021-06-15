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
  image: {
    type: String,
    required: false,
  },
  cloudinaryId: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Items", ItemSchema);
