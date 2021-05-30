const Items = require("../models/Items");
const Order = require("../models/Order");

module.exports = {
  addOrder: async (req, res) => {
    try {
      let orderObj = JSON.parse(req.body.orders);
      const order = await Items.find({ _id: { $in: orderObj } }).lean();
      res.render("confirm.ejs", { order: order, user: req.user });
    } catch (err) {
      console.log(`ORDER CONTROLLER ${err}`);
    }
  },

  confirmOrder: async (req, res) => {
    let orderIds = JSON.parse(req.body.confirm);
    try {
      await Order.create({
        user: req.user.userName,
        itemIds: orderIds,
        createdAt: Date().toLocaleString(),
      }),
        res.render("thankYou.ejs");
    } catch (err) {
      console.log(err);
    }
  },

  getOrder: async (req, res) => {
    try {
      const orders = await Orders.find().lean();
      res.render("createItem.ejs", { orders: orders });
      console.log(orders);
    } catch (err) {
      console.log(err);
    }
  },
};
