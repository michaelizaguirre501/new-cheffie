const Items = require("../models/Items");
const Order = require("../models/Order");

module.exports = {
  getMenu: async (req, res) => {
    try {
      const items = await Items.find().lean();
      res.render("dashboard.ejs", { items: items, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getCreateForm: async (req, res) => {
    try {
      const orders = await Order.find().lean();
      //for each order element there is an array of item ids need to find
      //the items that match those ids
      //need to send the user and item names for each order to the view

      for (let order of orders) {
        order.itemIds = await Promise.all(
          order.itemIds.map((itemId) => Items.findById(itemId))
        );
      }
      console.log(orders.map((order) => order.itemIds));
      res.render("createItem.ejs", { orders });
    } catch (err) {
      console.log(`ITEMS CONTROLLER ${err}`);
    }
  },

  createItem: async (req, res) => {
    try {
      await Items.create({
        name: req.body.name,
        desc: req.body.desc,
        ingredients: req.body.ingredients,
        course: req.body.course,
      });
      console.log(req.body.name);
      res.redirect("/dashboard");
    } catch (err) {
      console.log(err);
    }
  },
};
