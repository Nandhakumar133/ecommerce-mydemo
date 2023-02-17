const mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");

mongoose.pluralize(null);

const { connection } = require("../connection/mongodb");

var test = mongoose.Schema(
  {
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    gender: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    phone_number: {
      type: Number,
    },
    password: {
      type: String,
    },
    is_delete: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
test.plugin(mongoosePaginate);

module.exports = connection.model("user", test);
