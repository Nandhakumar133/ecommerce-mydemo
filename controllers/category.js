const Category = require("../model/category");
require("dotenv").config();

const addCategory = (req, res) => {
  // const { filename} = req.file;
  let newUser = new Category({
    category_name: req.body.category_name,
    categories: req.body.categories,
    // image_url: filename,
  });
  newUser.save(newUser, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    } else {
      res.status(200).send("Category details updated successfully!");
    }
  });
};
const findName = (req, res) => {
    let query = req.query;
    Category.find(
      {
        $text: { $search: query.category_name },
      },
      (err, result) => {
        if (err) {
          return res.status(400).send(err);
        } else {
          res
            .status(200)
            .send({ mesage: "Find name completed", result: result });
        }
      }
    );
  };
const getUser = (req, res) => {
    Category.find({}, (err, result) => {
      console.log(result);
      if (err) {
        return res.status(400).send(err);
      } else {
        // return res.render("users", { user: result });
        res.status(200).send({message: "User details!",data: result,});
      }
    });
  };
const updateName = (req,res)=>{
    Category.findByIdAndUpdate(req.params.id,{$set:{category_name:req.body.category_name}},{new : true },(err,result)=>{
        if(err){
            return res.status(400).send(err)
        }else{
            res.status(200).send({message:"Category name updated successfully!"})
        }
    })
}
const deleteCategory = (req,res)=>{
    Category.findByIdAndUpdate(req.params.id,{$set:{is_delete:1}},{new: true},(err,result)=>{
        if(err){
            return res.status(400).send(err)
        }else{
            res.status(200).send({message:"Delete category successfully!",data:result})
        }
    })
}
module.exports = {
  addCategory,
  getUser,
  updateName,
  deleteCategory,
  findName
};
