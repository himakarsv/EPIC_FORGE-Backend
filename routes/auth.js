const express=require("express");
const router=express.Router();
// import controllers
const {Login,Register}=require("../controllers/auth");
router.post("/login",Login);
router.post("/register",Register);
module.exports=router;