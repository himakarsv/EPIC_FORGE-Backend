const User=require("../models/user");
const Product=require("../models/product");
const Order = require('../models/order');
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")


const addProduct=async(req,res)=>{
    const userId=req.user.id;
    const {name,color,type,size,price,marketValue,retailValue}=req.body;
    try {
        
        const product=new Product({name,userId,color,type,size,price,marketValue,retailValue});
        await product.save();
        res.status(201).json({ message: 'Product registered successfully' });
        console.log("Product created");
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
}

const editProduct=async(req,res)=>{

    try {
        console.log(req.params);
        const productId = req.params.id;
        console.log(productId);
        const { name, price, marketValue, retailValue, color, size } = req.body;
    
        // Ensure the product belongs to the logged-in seller
        const product = await Product.findOne({ _id: productId });
        
        if (!product) return res.status(404).json({ error: 'Product not found or unauthorized' });
    
        product.name = name;
        product.price = price;
        product.marketValue = marketValue;
        product.retailValue = retailValue;
        product.color = color;
        product.size = size;
    
        await product.save();
        res.json(product);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
};

const deleteProduct=async(req,res)=>{

    try {
        const productId = req.params.id;
    
        // Ensure the product belongs to the logged-in seller
        const product = await Product.findOneAndDelete({ _id: productId });
    
        if (!product) return res.status(404).json({ error: 'Product not found or unauthorized' });
    
        res.json({ message: 'Product deleted successfully' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

const showProducts=async(req,res)=>{
    try {
        const products = await Product.find();
        res.json(products);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

const addToWishlist=async(req,res)=>{

    const userId = req.user.id;
  const productId = req.params.id;

  try {
    const user = await User.findById(userId);
    console.log(productId);
    if (!user.wishlist.includes(productId)) {
      user.wishlist.push(productId);
      await user.save();
    }
    res.status(200).json({ message: 'Product added to wishlist' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const viewWishlist = async (req, res) => {
    const userId = req.user.id; 
  console.log(userId);
    try {
      const user = await User.findById(userId).populate('wishlist'); 
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user.wishlist); 
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  const placeOrder = async (req, res) => {
    try {
      const { productId, quantity } = req.body;
      const buyerId = req.user.id;
      const product = await Product.findById(productId);
      const sellerId = product.seller;
      const totalPrice = product.price * quantity;
      const newOrder = new Order({
        buyer: buyerId,
        seller: sellerId,
        product: productId,
        quantity,
        totalPrice,
      });
  
      await newOrder.save();
  
      res.status(200).json({ message: 'Order placed successfully', order: newOrder });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const showOrdersBuyer=async(req,res)=>{
    try {
        const orders = await Order.find({ buyer: req.user.id }).populate('product');
        res.status(200).json(orders);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
  }

  const showOrdersSeller=async(req,res)=>{
    try {
        const orders = await Order.find({ seller: req.user.id }).populate('product');
        res.status(200).json(orders);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
  }
  
module.exports={addProduct,editProduct,deleteProduct,showProducts,addToWishlist,viewWishlist,placeOrder,showOrdersBuyer,showOrdersSeller};