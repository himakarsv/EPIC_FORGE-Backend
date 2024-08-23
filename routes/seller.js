const express=require("express");
const router=express.Router();
const {authenticateSeller,authenticateBuyer}=require("../middlewares/auth")
// import controllers

const {addProduct,editProduct,deleteProduct,showProducts,showOrdersSeller}=require("../controllers/product")

router.post("/addProduct",authenticateSeller,addProduct);
router.get("/products",authenticateSeller,showProducts);
router.put("/editProduct/:id",authenticateSeller,editProduct);
router.delete("/deleteProduct/:id",authenticateSeller,deleteProduct);
router.get("/orders",authenticateSeller,showOrdersSeller);


module.exports=router;