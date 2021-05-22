const Items = require("../models/Items");

module.exports = {
  createItem: async (req, res) => {
    try {
      res.render("createItem", {
        title: "Create Item",
      });
    } catch (err) {
      console.log(err);
    }
  },

  getMenu: async (req, res) => {
    try {
      const items = await Items.find().lean();
      res.render("dashboard.ejs", { items: items });
    } catch (err) {
      console.log(err);
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
