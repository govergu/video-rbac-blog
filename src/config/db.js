const mongoose = require("mongoose");

const config = require("./index");

function connectToDb() {
  mongoose.connect(config.dbUrl).then(() => {
    console.log("Connection Successful to Database");
  });
}

module.exports = connectToDb;
