const Items = require("../models/Items");

module.exports = {
  getMenu: async (req, res) => {
    try {
      const items = await Items.find().lean();
      res.render("dashboard.ejs", { items: items, user: req.user });
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
