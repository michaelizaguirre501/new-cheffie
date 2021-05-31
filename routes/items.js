const express = require("express");
const router = express.Router();
const itemsController = require("../controllers/items");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/items", itemsController.getMenu);
router.get("/createItem", ensureAuth, itemsController.getCreateForm);
router.post("/createItem", ensureAuth, itemsController.createItem);
router.delete("/deleteItem/:id", ensureAuth, itemsController.deleteItem);

module.exports = router;
