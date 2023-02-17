const mongoose = require('mongoose');
mongoose.pluralize(null);

const { connection } = require("../connection/mongodb");

var test = mongoose.Schema({
    product_name:{
        type:String,
    },
    price:{
        type:Number,
    },
    description:{
        type:String,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        // required: true
      },
    is_delete:{
        type:Number,
        default:0,
      },
},{timestamps:true});

module.exports = connection.model("product",test);