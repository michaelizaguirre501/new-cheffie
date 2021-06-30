const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    itemIds: {
      type: [{ type: mongoose.Types.ObjectId, ref: "Item" }],
      default: [],
    },
    notes: {
      type: String,
    },
    fulfilled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
