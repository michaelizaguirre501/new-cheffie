const express = require("express");
const router = express.Router();
const apiController = require("../controllers/api");

router.post("/addOrder", apiController.addOrder);

module.exports = router;
