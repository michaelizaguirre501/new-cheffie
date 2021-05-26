const Item = require("../models/Item");
const orderArr = require("../public/javascript/order");

module.exports = {
  addOrder: async (req, res) => {
    try {
      ///get the array from client side js
      //look in database for the items matching those ids
      // send the ordered items to the confirm order and chef dashboard
    } catch (err) {
      console.log(`ORDER CONTROLLER ${err}`);
    }
  },
};
