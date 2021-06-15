const express = require("express");
const router = express.Router();
const itemsController = require("../controllers/items");
const upload = require("../middleware/multer");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/items", itemsController.getMenu);
router.get("/chef-dashboard", ensureAuth, itemsController.getCreateForm);
router.post(
  "/createItem",
  upload.single("file"),
  ensureAuth,
  itemsController.createItem
);
router.delete("/deleteItem/:id", ensureAuth, itemsController.deleteItem);

module.exports = router;
