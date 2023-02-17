const mongoose = require('mongoose');
mongoose.pluralize(null);

const { connection } = require("../connection/mongodb");

var test = mongoose.Schema({
    category_name:{
        type:String,
    },
    categories:{
        type:String,
    },
    image_url:{
        type:String,
        default:"",
    },
    is_delete:{
        type:Number,
        default:0,
    },
},{timestamps:true});

module.exports = connection.model("category",test);