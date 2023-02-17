const mongoose = require("mongoose");
mongoose.pluralize(null);

const { connection } = require("../connection/mongodb");

var test = mongoose.Schema(
  {
    color: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      // required: true
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      // required: true
    },
    is_delete: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
module.exports = connection.model("color", test);
