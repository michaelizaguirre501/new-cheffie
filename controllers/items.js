const Items = require("../models/Items");
const Order = require("../models/Order");

module.exports = {
  getMenu: async (req, res) => {
    try {
      const items = await Items.find().lean();
      console.log(items);
      res.render("dashboard.ejs", { items: items, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getCreateForm: async (req, res) => {
    if (req.user.isAdmin) {
      try {
        const orders = await Order.find().lean();
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
    } else {
      res.redirect("/dashboard");
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
      res.redirect("/dashboard");
    } catch (err) {
      console.log(err);
    }
  },

  deleteItem: async (req, res) => {
    try {
      const item = await Items.findById({ _id: req.params.id });
      await Items.remove(item);
      console.log(`Item ${item} removed`);
      res.redirect("back");
    } catch (err) {
      console.log(err);
    }
  },
};
