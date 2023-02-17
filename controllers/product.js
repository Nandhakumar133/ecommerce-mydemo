const Product = require("../model/product");
require("dotenv").config();

const addProduct = (req, res) => {
  let newUserObj = new Product({
    product_name: req.body.product_name,
    price: req.body.price,
    description: req.body.description,
  });
  newUserObj.save(newUserObj, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    } else {
      res.status(200).send({
        message: "Product details updated successfully!",
        data: result,
      });
    }
  });
};
const getUsers = (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  let page = parseInt(req.query.page) || 1;
  if (page > 0) {
    page = page - 1;
  }
  Product.find({}, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    } else {
      res.status(200).send({
        message: "User details!",
        data: result,
      });
    }
  })
    .skip(limit * page)
    .limit(limit);
};
const updateProduct = (req, res) => {
  Product.findByIdAndUpdate(
    req.params.id,
    { $set: { price: req.body.price } },
    (err, result) => {
      if (err) {
        return res.status(400).send(err);
      } else {
        res
          .status(200)
          .send({ message: "Product price  updated successfully!" });
      }
    }
  );
};
const deleteProduct = (req, res) => {
  Product.findByIdAndUpdate({_id:req.params.id},{$set:{is_delete: 1}},{new : true},(err,result)=>{
    if(err){
      return res.status(400).send(err);
    }else{
      res.status(200).send({message:"Product deleted successfully!",data:result});
    }
  });
};
const findProduct = (req, res) => {
  let query = req.query;
  Product.find(
    {
      $text: { $search: query.searchText },
      // $text: { $search: query.searchPrice },
    },
    (err, result) => {
      if (err) {
        return res.status(400).send(err);
      } else {
        res
          .status(200)
          .send({ mesage: "Find product details completed", result: result });
      }
    }
  );
};
const ascendingOrder = (req, res) => {
  Product.aggregate([{ $sort: { product_name: 1 } }], (err, result) => {
    if (err) {
      return res.status(400).send(err);
    } else {
      res.status(200).send({ message: "Product name sorted successfully!", data: result });
    }
  });
};
const priceSortByAscending = (req, res) => {
  Product.aggregate([{ $sort: { price: -1 } }], (err, result) => {
    if (err) {
      return res.status(400).send(err);
    } else {
      res.status(200).send({ message: "Price successfully sorted!", data: result });
    }
  });
};
const filterByPrice = (req,res)=>{
  Product.find({price: { $gt: 100, $lte: 2000}},(err, result) => {
    if (err) {
      return res.status(400).send(err);
    } else {
      res.status(200).send({
        message: "Price it can filtered successfully!",data: result,});
    }
  })
}
module.exports = {
  addProduct,
  getUsers,
  updateProduct,
  deleteProduct,
  findProduct,
  ascendingOrder,
  priceSortByAscending,
  filterByPrice
};
