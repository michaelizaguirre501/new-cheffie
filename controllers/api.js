const Items = require("../models/Items");

module.exports = {
  addOrder: async (req, res) => {
    try {
      let orderObj = JSON.parse(req.body.orders);
      const order = await Items.find({ _id: { $in: orderObj } }).lean();
      res.render("confirm.ejs", { order: order });
    } catch (err) {
      console.log(`ORDER CONTROLLER ${err}`);
    }
  },

  confirmOrder: async (req, res) => {
    try {
      console.log("working confirmOrder");
    } catch (err) {
      console.log(err);
    }
  },
};
