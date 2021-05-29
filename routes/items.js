const express = require("express");
const router = express.Router();
const itemsController = require("../controllers/items");
const apiController = require("../controllers/api");

router.get("/items", itemsController.getMenu);
router.get("/createItem", itemsController.createItem, apiController.getOrder);

module.exports = router;
