require("dotenv").config();

module.exports = {
  port: process.env.PORT || 8080,
  dbUrl: process.env.MONGO_URL,
  jwtSecret: process.env.JWT_SECRET,
};
