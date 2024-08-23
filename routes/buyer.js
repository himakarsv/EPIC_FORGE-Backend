const express=require("express");
const router=express.Router();
const {authenticateSeller,authenticateBuyer}=require("../middlewares/auth")
// import controllers

const {addProduct,editProduct,deleteProduct,showProducts,addToWishlist,viewWishlist,placeOrder,showOrdersBuyer}=require("../controllers/product")

router.get("/products",authenticateBuyer,showProducts);
router.post("/addtoWishlist/:id",authenticateBuyer,addToWishlist);
router.get("/viewwishlist",authenticateBuyer,viewWishlist);
router.post('/placeOrder', authenticateBuyer, placeOrder);
router.get("/orders",authenticateBuyer,showOrdersBuyer);
// TBD
// router.get("/buyproduct",authenticateBuyer,showProducts);


module.exports=router;