const featuredProduct = require('../model/featuredProducts');
const Product = require("../model/product");
var objectID = require('mongodb').ObjectID
require('dotenv').config();

const addNewProduct = (req,res)=>{
    let newProduct = new featuredProduct({
        name:req.body.name,
        price:req.body.price,
        description:req.body.description,
        product_id:req.body.product_id
    });
    newProduct.save(newProduct,(err,result)=>{
        if(err){
            return res.status(400).send(err)
        }else{
            res.status(200).send({message:"New product updated successfully!",data:result});
        }
    });
}

module.exports = {
    addNewProduct
}