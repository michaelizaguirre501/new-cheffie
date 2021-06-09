const Items = require("../models/Items");
const Order = require("../models/Order");

module.exports = {
  getMenu: async (req, res) => {
    try {
      const items = await Items.find().lean();
      const courses = { Starter: [], Main: [], "Side-dish": [], Dessert: [] };
      const formattedItems = items.reduce((items, item) => {
        items[item.course].push(item);
        return items;
      }, courses);
      const orderedCourses = [
        ...formattedItems.Starter,
        ...formattedItems.Main,
        ...formattedItems["Side-dish"],
        ...formattedItems.Dessert,
      ];

      res.render("dashboard.ejs", { items: orderedCourses, user: req.user });
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

        //for each order in orders create array with ordered item ingredients && create array of ordered item names

        const counts = orders.reduce((acc, order) => {
          order.itemIds.forEach((item) => {
            acc[item.id] = acc[item.id] || {};
            acc[item.id].name = item.name;
            acc[item.id].count = (acc[item.id].count || 0) + 1;
            acc[item.id].ingredients = item.ingredients;
          });
          return acc;
        }, {});

        // let ingredientsArray = orders.map((orders) => ({
        //   name: orders.name,
        //   ingredients: orders.ingredients,
        //   timesOrdered: "the amount of times this appears in the array",
        // }));
        res.render("createItem.ejs", { orders, counts });
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
      res.redirect("back");
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
