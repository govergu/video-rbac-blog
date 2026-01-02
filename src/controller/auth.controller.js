const User = require("../models/user.models");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/generateToken");
const AppError = require("../utils/appError");

exports.registerUser = async (req, res, next) => {
  const { email, username, password } = req.body;

  try {
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
    });

    const token = generateToken(newUser._id, newUser.role);

    res.status(200).json({ token });
  } catch (error) {
    next(new AppError(500, error.message));
    // res.status(500).json({
    //   message: "Error while registering the user",
    //   error: error.message,
    // });
  }
};

exports.loginUser = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) return res.status(403).json("Invalid Credentials");

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(403).json("Invalid Credentials");

    const token = generateToken(user._id, user.role);

    res.status(200).json({ token });
  } catch (error) {
    next(new AppError(500, error.message));
    res.status(500).json({
      message: "Error while logging in the user",
      error: error.message,
    });
  }
};
