const Item = require("../models/Item");
const orderArr= require('../public/javascript/order')

module.exports = {
  addOrder: async (req, res) => {
    const order = await fetch orderArr
  },
};
