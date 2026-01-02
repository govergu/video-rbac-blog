const jwt = require("jsonwebtoken");
const config = require("../config/index");
exports.generateToken = (id, role) => {
  return jwt.sign({ id, role }, config.jwtSecret, { expiresIn: "1d" });
};
