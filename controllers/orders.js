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
        notes: req.body.notes,
      }),
        res.render("thankYou.ejs");
    } catch (err) {
      console.log(err);
    }
  },

  deleteOrder: async (req, res) => {
    try {
      const order = await Order.findById({ _id: req.params.id });
      await Order.deleteOne(order);
      console.log("order removed");
      res.redirect("back");
    } catch (err) {
      console.log(err);
    }
  },
  userOrders: async (req, res) => {
    try {
      const orders = await Order.find({ user: req.user.userName });
      for (let order of orders) {
        order.itemIds = await Promise.all(
          order.itemIds.map((itemId) => Items.findById(itemId))
        );
      }
      console.log(orders);
      console.log("order for user found");
      res.render("myOrders", { orders });
    } catch (err) {
      console.log(err);
    }
  },
};
