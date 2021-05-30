const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const itemsController = require("../controllers/items");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/dashboard", ensureAuth, itemsController.getMenu);
router.get("/login", ensureGuest, authController.getLogin);
router.post("/login", ensureGuest, authController.postLogin);
router.get("/logout", ensureAuth, authController.logout);
router.get("/signup", ensureGuest, authController.getSignup);
router.post("/signup", ensureGuest, authController.postSignup);
router.get("/thankYou", homeController.getThankYou);
module.exports = router;
