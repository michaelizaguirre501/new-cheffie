const express = require("express");
const router = express.Router();
const apiController = require("../controllers/api");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.post("/addOrder", ensureAuth, apiController.addOrder);
router.post("/confirmOrder", ensureAuth, apiController.confirmOrder);

module.exports = router;
