//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const methodOverride = require("method-override");
const flash = require("express-flash");
const path = require("path");
const logger = require("morgan");
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");
const itemsRoutes = require("./routes/items");
const ordersRoutes = require("./routes/orders");

const app = express();

// Passport config
require("./config/passport")(passport);

//Connect To Database
connectDB();

//Using EJS for views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Static Folder
app.use(express.static("public"));

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

//Make logged in user object available to all templates
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);
app.use("/items", itemsRoutes);
app.use("/orders", ordersRoutes);

//Server Running

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.info(`Server is running on PORT ${PORT}`);
});
