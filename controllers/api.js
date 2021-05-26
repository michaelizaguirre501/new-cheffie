const Items = require("../models/Items");

module.exports = {
  addOrder: async (req, res) => {
    try {
      let orderObj = JSON.parse(req.body.orders).map((x) => ({
        id: x,
      }));
      const ledio = "60a8934470f7fe07ecc24834";
      const order = Items.findById(ledio);
      console.log(order);
      res.render("confirm.ejs", {
        order: order,
        user: req.user,
      });
    } catch (err) {
      console.log(`ORDER CONTROLLER ${err}`);
    }
  },
};
