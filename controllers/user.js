const User = require("../model/user");
require("dotenv").config();
var objectID = require('mongodb').ObjectID

const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  let newUser = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    gender: req.body.gender,
    email: req.body.email,
    phone_number: req.body.phone_number,
    password: hashedPassword,
  });
  newUser.save(newUser, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    } else {
      res.status(200).send({ message: "User details saved successfully!" });
    }
  });
};
const getUserList = async(req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    let page = parseInt(req.query.page) || 1;
    if(page>0){
        page = page - 1
    }
    User.find({},(err, result) => {
        if (err) {
          return res.status(400).send(err);
        } else {
          res.status(200).send({
            message: "User details!",
            data: result,
          });
        }}).skip(limit * page)
        .limit(limit)    
}   
const login = (req, res) => {
  const userid = req.body.id;
  User.find({ _id: userid }, async (err, result) => {
    if (err) {
      return res.status(400).send(err);
    } else {
      if (result.length) {
        console.log(result.length);
        console.log(result);
        const password = await bcrypt.compare(req.body.password,result[0].password);
        if (password) {
            const secret = process.env.ACCESS_TOKEN_SECRET || "ABCDEFGHIJKLMNOPQRSTUVWXYZ133";
            const token = jwt.sign({userid:result._id},secret,{ expiresIn: "1hr"});
          res.status(200).json({ message: "User signed successfully!",accessToken: token,first_name:result[0] });
        } else {
          return res.status(400).send("password is incorrect!");
        }
      } else {
        return res.status(400).send("User not found");
      }
    }
  });
};
const findUser = (req, res) => {
    let query = req.query;
    // var quer = req.query
    User.find(
      {
        $text: { $search: query.first_name},
        // $text: { $search: quer.email},
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
  const getnewuser = (req,res)=>{
    User.find({
      // product_size: "small",
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
  register,
  getUserList,
  login,
  findUser,
  getnewuser
};
