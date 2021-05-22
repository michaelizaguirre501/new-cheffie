const express = require("express");
const router = express.Router();
const itemsController = require("../controllers/items");

router.get("/items", itemsController.getMenu);
router.get("/createItem", itemsController.createItem);

module.exports = router;
