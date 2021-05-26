const express = require("express");
const router = express.Router();
const apiController = require("../controllers/api");

router.get("/addOrder", apiController.addOrder);
