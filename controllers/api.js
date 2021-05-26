const Items = require("../models/Items");

module.exports = {
  addOrder: async (req, res) => {
    try {
      let orderObj = JSON.parse(req.body.orders).map((x) => ({ _id: x }));
      const order = Items.find({ $or: orderObj });
      res.render("confirm.ejs", {
        order: order,
        user: req.user,
      });
    } catch (err) {
      console.log(`ORDER CONTROLLER ${err}`);
    }
  },
};
