const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/orders");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.post("/addOrder", ensureAuth, ordersController.addOrder);
router.post("/confirmOrder", ensureAuth, ordersController.confirmOrder);
router.get("/confirmOrder", ensureAuth, ordersController.getOrder);

module.exports = router;
