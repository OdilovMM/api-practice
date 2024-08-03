const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../utils");

const auth = async (req, res, next) => {
  // check headers
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("No token attached");
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = User.findById(payload.id).select("-password");
    req.user = user;
    // attach user to routes
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    throw new UnauthenticatedError("No token attached");
  }
};

module.exports = auth;
