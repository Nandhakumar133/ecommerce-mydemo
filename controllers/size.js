const productSize = require("../model/size");
require("dotenv").config();

const addSize = (req, res) => {
  let newUser = new productSize({
    product_size: req.body.product_size,
  });
  newUser.save(newUser, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    } else {
      res
        .status(200)
        .send({ message: "Size details updated successfully!", data: result });
    }
  });
};
const deleteSize = (req,res)=>{
    productSize.findByIdAndUpdate(req.params.id,{$set:{is_delete:1}},{new: true},(err,result)=>{
        if(err){
            return res.status(400).send(err)
        }else{
            res.status(200).send({message:"Deleted successfully!",data:result})
        }
    })
}
const updateSize = (req,res)=>{
    productSize.findByIdAndUpdate(req.params.id,{$set:{product_size:req.body.product_size}},{new : true },(err,result)=>{
        if(err){
            return res.status(400).send(err)
        }else{
            res.status(200).send({message:"Product price  updated successfully!"})
        }
    })
}
const getUsersList = (req, res) => {
    productSize.find({}, (err, result) => {
      if (err) {
        return res.status(400).send(err);
      } else {
        res.status(200).send({
          message: "User details!",
          data: result,
        });
      }
    });
  };
  const filterBySize = (req,res)=>{
    productSize.find({
      product_size: "small",
      // product_size: "medium",
      // product_size: "large",
    },(err,result)=>{
      if(err){
        return res.status(400).send(err)
      }else{
        res.status(200).send({message:"Size filterd successfully!",data:result});
      }
    })
  }
module.exports = {
    addSize,
    deleteSize,
    updateSize,
    getUsersList,
    filterBySize
};
