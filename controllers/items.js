const cloudinary = require("../middleware/cloudinary");
const Item = require("../models/Item");
const Order = require("../models/Order");

module.exports = {
  getMenu: async (req, res) => {
    try {
      const items = await Item.find().lean();
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

  getRemovedMenu: async (req, res) => {
    try {
      const items = await Item.find({ available: false }).lean();
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

      res.render("removedItems.ejs", { items: orderedCourses, user: req.user });
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
            order.itemIds.map((itemId) => Item.findById(itemId))
          );
        }

        // create an object with order.itemIds.names and ingredients while counting duplicates to be sent to ejs as counts
        const counts = orders.reduce((acc, order) => {
          order.itemIds.forEach((item) => {
            acc[item.id] = acc[item.id] || {};
            acc[item.id].name = item.name;
            acc[item.id].count = (acc[item.id].count || 0) + 1;
            acc[item.id].ingredients = item.ingredients;
          });
          return acc;
        }, {});

        res.render("chef-dashboard.ejs", { orders, counts });
      } catch (err) {
        console.log(`ITEMS CONTROLLER ${err}`);
      }
    } else {
      res.redirect("/dashboard");
    }
  },

  createItem: async (req, res) => {
    try {
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        await Item.create({
          name: req.body.name,
          desc: req.body.desc,
          ingredients: req.body.ingredients,
          course: req.body.course,
          image: result.secure_url,
          cloudinaryId: result.public_id,
          available: true,
        });
      } else {
        await Item.create({
          name: req.body.name,
          desc: req.body.desc,
          ingredients: req.body.ingredients,
          course: req.body.course,
        });
      }
      res.redirect("back");
    } catch (err) {
      console.log(err);
    }
  },
  //Set item available  to false removing it from the menu page
  removeItem: async (req, res) => {
    try {
      const item = await Item.updateOne(
        { _id: req.params.id },
        { available: false }
      );

      console.log(`Item ${item} removed`);
      res.redirect("back");
    } catch (err) {
      console.log(err);
    }
  },
  //permanently delete menu item from database. This will throw error in orders
  deleteItem: async (req, res) => {
    try {
      const item = await Item.findById({ _id: req.params.id });
      await Item.deleteOne(item);
      console.log(`Item ${item} removed`);
      res.redirect("back");
    } catch (err) {
      console.log(err);
    }
  },
  //set item availibility to true removing it from removed items page and restoring it to menu
  restoreItem: async (req, res) => {
    try {
      const item = await Item.updateOne(
        { _id: req.params.id },
        { available: true }
      );

      console.log(`Item ${item} removed`);
      res.redirect("back");
    } catch (err) {
      console.log(err);
    }
  },
};
