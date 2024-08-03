require("dotenv").config();
const express = require("express");
const app = express();
require("express-async-errors");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
const todoRouter = require("./routes/todoRoutes");
const authRouter = require("./routes/authRoutes");
const auth = require("./middleware/checkAuth");
const cors = require("cors");
const xss = require("xss-clean");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

// setting up static files

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000,
  })
);
app.use(express.static("./public"));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());
// Routes

app.get("/test-api", (req, res) => {
  res.send("Test route");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/todo", auth, todoRouter);

// middleware
app.use(notFound);
app.use(errorHandler);

module.exports = app;
