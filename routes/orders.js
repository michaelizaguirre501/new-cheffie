const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/orders");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.post("/addOrder", ensureAuth, ordersController.addOrder);
router.post("/confirmOrder", ensureAuth, ordersController.confirmOrder);
router.delete("/deleteOrder/:id", ensureAuth, ordersController.deleteOrder);
router.get("/myOrders", ensureAuth, ordersController.userOrders);

module.exports = router;
