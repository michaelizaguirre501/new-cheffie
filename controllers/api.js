const Items = require("../models/Items");

module.exports = {
  addOrder: async (req, res) => {
    try {
      let orderObj = JSON.parse(req.body.orders); //.map((x) => ({ id: x }));
      const order = await Items.find({ _id: { $in: orderObj } }).lean();
      console.log(orderObj);
      res.render("confirm.ejs", { order: order });
    } catch (err) {
      console.log(`ORDER CONTROLLER ${err}`);
    }
  },
};
