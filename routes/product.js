const express=require("express");
const router=express.Router();
const {authenticateSeller,authenticateBuyer}=require("../middlewares/auth")
// import controllers

const {addProduct,editProduct,deleteProduct}=require("../controllers/product")

router.post("/addProduct",authenticateSeller,addProduct);
router.post("/editProduct",authenticateSeller,editProduct);
router.post("/deleteProduct",authenticateSeller,deleteProduct);
router.get("/products",authenticateBuyer,showProducts);
// TBD
// router.get("/buyproduct",authenticateBuyer,showProducts);

module.exports=router;