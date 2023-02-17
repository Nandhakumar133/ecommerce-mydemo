const router = require("express").Router();
require("../connection/mongodb");
// const connect = require("../connection/mongodb");
const userController = require("../controllers/user");
const categoryController = require("../controllers/category");
const prodctController = require("../controllers/product");
const sizeController = require("../controllers/size");
const colorController = require("../controllers/color");
const verifierController = require("../middlewares/token - verifier");
const newProductController = require("../controllers/featuredProduts");
// const multer = require("multer");

// var imgconfig = multer.diskStorage({
//     destination: (req, file, callback) => {
//       callback(null, "./uploads");
//     },
//     filename: (req, file, callback) => {
//       callback(null, `image-${Date.now()}.${file.originalname}`);
//     },
//   });

//   const isImage = (req, file, callback) => {
//     if (file.mimetype.startsWith("image")) {
//       callback(null, true);
//     } else {
//       callback(null, error("only image is allowed"));
//     }
//   };

//   var upload = multer({
//     storage: imgconfig,
//     fileFilter: isImage,
//   });
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/getnewuser", verifierController,userController.getnewuser);
// router.get("/accesstoken",verifierController);
router.post("/addcategory", categoryController.addCategory);
router.post("/addproduct", prodctController.addProduct);
router.post("/addsize", sizeController.addSize);
router.post("/addcolor", colorController.addColor);
router.get("/getuser", categoryController.getUser);
router.put("/updatename/:id", categoryController.updateName);
router.delete("/deletecategory/:id", categoryController.deleteCategory);
router.get("/findname", categoryController.findName);
router.get("/getusers", prodctController.getUsers);
router.put("/updateproduct/:id", prodctController.updateProduct);
router.delete("/deleteproduct/:id", prodctController.deleteProduct);
router.get("/findproduct", prodctController.findProduct);
router.delete("/deletesize/:id", sizeController.deleteSize);
router.put("/updatesize", sizeController.updateSize);
router.get("/getuserslist", sizeController.getUsersList);
router.put("/updatecolor/:id", colorController.updateColor);
router.delete("/deletecolor", colorController.deleteColor);
router.get("/getuserdetails", colorController.getUserDetails);
router.get("/getuserlist", userController.getUserList);
router.get("/finduser", userController.findUser);
router.get("/ascendingorder", prodctController.ascendingOrder);
router.get("/sortbyprice", prodctController.priceSortByAscending);
router.get("/filterbysize", sizeController.filterBySize);
router.get("/filterbycolor", colorController.filterByColor);
router.get("/filterbyprice", prodctController.filterByPrice);
router.post("/addnewproduct", newProductController.addNewProduct);

module.exports = router;
