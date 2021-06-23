const cloudinary = require("../middleware/cloudinary");
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
        await Items.create({
          name: req.body.name,
          desc: req.body.desc,
          ingredients: req.body.ingredients,
          course: req.body.course,
          image: result.secure_url,
          cloudinaryId: result.public_id,
        });
      } else {
        await Items.create({
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

  removeItem: async (req, res) => {
    try {
      const item = await Items.updateOne(
        { _id: req.params.id },
        { available: false }
      );

      console.log(`Item ${item} removed`);
      res.redirect("back");
    } catch (err) {
      console.log(err);
    }
  },
};
