const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  itemIds: {
    type: Array,
  },
  createdAt: {
    type: String,
  },
  notes: {
    type: String,
  },
  fulfilled: {
    type: Boolean,
    default: false,
    required: true,
  },
});

module.exports = mongoose.model("Order", OrderSchema);
