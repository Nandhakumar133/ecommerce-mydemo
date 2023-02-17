const mongoose = require("mongoose");
var objectID = require('mongodb').ObjectID
require("dotenv").config();

// console.log(process.env.CONNECTION_STRING);
mongoose.connection = mongoose.createConnection(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});

mongoose.connection.on("connected", () => {
  console.log("connected");
});

mongoose.connection.on("disconnected", () => {
  console.log("disconnected");
});

module.exports = mongoose;
