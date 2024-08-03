require("dotenv").config();
const express = require("express");
const app = express();
require("express-async-errors");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

// setting up static files

app.use(express.static("./public"));
app.use(express.json());

// Routes

app.get("/test-api", (req, res) => {
  res.send("Test route");
});

// app.use("/api/v1/");

// middleware
app.use(notFound);
app.use(errorHandler);

module.exports = app;
