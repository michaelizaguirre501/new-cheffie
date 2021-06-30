const Item = require("../models/Item");
const Order = require("../models/Order");

module.exports = {
  addOrder: async (req, res) => {
    try {
      let orderObj = JSON.parse(req.body.orders);
      const order = await Item.find({ _id: { $in: orderObj } }).lean();
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
        notes: req.body.notes,
      }),
        res.render("thankYou.ejs");
    } catch (err) {
      console.log(err);
    }
  },

  userOrders: async (req, res) => {
    try {
      const orders = await Order.find({ user: req.user.userName });
      for (let order of orders) {
        order.itemIds = await Promise.all(
          order.itemIds.map((itemId) => Item.findById(itemId))
        );
      }

      console.log(`orders for ${req.user.userName} found`);
      res.render("myOrders.ejs", { orders });
    } catch (err) {
      console.log(err);
    }
  },
  fulfillOrder: async (req, res) => {
    try {
      const order = await Order.findById({ _id: req.params.id });
      if (order.fulfilled === true) {
        await Order.updateOne({ _id: req.params.id }, { fulfilled: false });
      } else {
        await Order.updateOne({ _id: req.params.id }, { fulfilled: true });
      }
      console.log("fulfilled");
      res.redirect("back");
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
};
