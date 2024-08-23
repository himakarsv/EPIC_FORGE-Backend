const mongoose=require("mongoose");
const { Schema } = mongoose;
const productSchema = new Schema({
    name: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  color: String,
  type: String,
  size: String,
  price: Number,
  marketValue: Number,
  retailValue: Number,
  // productId: { type: String, unique: true },
});
const Product = mongoose.model('Product', productSchema);

module.exports=Product;
