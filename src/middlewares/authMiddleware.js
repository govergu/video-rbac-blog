const jwt = require("jsonwebtoken");
const User = require("../models/user.models");
const AppError = require("../utils/appError");

exports.authMiddleware = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer"))
    return next(new AppError(401, "No header found"));

  const token = authHeader.split(" ")[1];

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id).select("-password");

  if (!user) return res.status(404).json("User not Found");

  if (user.isBanned) {
    return next(new AppError(403, "The User is Banned"));
  }

  req.user = user;
  next();
};
