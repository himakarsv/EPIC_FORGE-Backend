const express=require("express");
const dotenv=require("dotenv");
const jwt=require("jsonwebtoken");
const mongoose=require("mongoose");
// const connectDb=require("./db");
// const {Login,Register}=require("./controllers/auth");
const cors=require("cors");
// routes
const port=3000||process.env.PORT;
const authRoute=require("./routes/auth");
// const productRoute=require("./routes/product");
const sellerRoute=require("./routes/seller");
const buyerRoute=require("./routes/buyer");
const orderRoute=require("./routes/order");
dotenv.config();
const {authenticateSeller,authenticateBuyer}=require("./middlewares/auth")
const app=express();
app.use(cors());
// connectDb().then(()=>{;
//     console.log("DB Connected Successfully")
// })
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use(express.json());
app.use('/auth', authRoute);
// app.use('/product', productRoute);
app.use("/seller",sellerRoute);
app.use("/buyer",authenticateBuyer,buyerRoute);
app.use('/orders', orderRoute);

// app.post("/register",Register);

app.listen(port,()=>{
    console.log("server is running on port 3000");
})