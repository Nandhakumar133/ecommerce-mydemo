const Color = require("../model/color");
require("dotenv").config();

const addColor = (req, res) => {
  let newUser = new Color({
    color: req.body.color,
    // _id: req.body._id,
    // _id: req.body._id,
  });
  newUser.save(newUser, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    } else {
      res.status(200).send({ message: "Color updated successfully!" });
    }
  });
};
const updateColor = (req,res)=>{
    Product.findByIdAndUpdate(req.params.id,{$set:{color:req.body.color}},(err,result)=>{
        if(err){
            return res.status(400).send(err)
        }else{
            res.status(200).send({message:"Product price  updated successfully!"})
        }
    })
}
const deleteColor = (req,res)=>{
    Product.findByIdAndUpdate(req.params.id,{$set:{is_delete:1}},{new: true},(err,result)=>{
        if(err){
            return res.status(400).send(err)
        }else{
            res.status(200).send({message:"Delete product successfully!",data:result})
        }
    })
}
const getUserDetails = (req, res) => {
    Product.find({}, (err, result) => {
      if (err) {
        return res.status(400).send(err);
      } else 
      {res.status(200).send({message: "User details!",data: result,})}
    });
  };
const filterByColor = (req,res)=>{
    Color.find({ color: "red"},(err,result)=>{
      if(err){
        return res.status(400).send(err)
      }else{
        res.status(200).send({message:"Color filtered successfully!",data:result});
      }
    })
  }
module.exports = {
  addColor,
  updateColor,
  deleteColor,
  getUserDetails,
  filterByColor
};
