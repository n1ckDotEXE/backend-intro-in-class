// Checks for error and returns result to user
const createError = require("http-errors");

// Require Express for use in file
const express = require("express");
// Require a path for use in file
const path = require("path");
// Require Cookie Parser for use in file
const cookieParser = require("cookie-parser");
// Require Morgan for use in fil
const logger = require("morgan");

// Require Mongoose for use in file
const mongoose = require("mongoose");

// Connect Mongoose to DB
mongoose
  .connect("mongodb://localhost:27017/backend-intro", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  // Log to console that DB connected
  .then(() => {
    console.log("MONGO DB CONNECTED");
  })

  // If errors occur, log to console
  .catch((e) => {
    console.log(e);
  });

// Index path set to variable
const indexRouter = require("./routes/index");
// Users folder set to variable
const usersRouter = require("./routes/users/users");

// Use app variable as Express
const app = express();

// Setup the view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
// Parse JSON objects for DB
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Parse Cookie header and populate req.cookies with an object keyed by the cookie names
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
