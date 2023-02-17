const mongoose = require('mongoose');
var objectID = require('mongodb').ObjectID
mongoose.pluralize(null);

const { connection } = require('../connection/mongodb');

var test = mongoose.Schema({

    name: {
        type: String,
    },
    price: {
        type:Number,
    },
    description: {
        type: String,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true,
    },
    is_delete: {
        type: Number,
        default: 0,
    },
},{timestamps:true});

module.exports = connection.model("featuredproducts",test);