const mongoose=require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
    username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['seller', 'buyer'], required: true },
  age: Number,
  dob: Date,
  address: String,
  rating: { type: Number, default: 0 },
  wishlist: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
});
const User = mongoose.model('User', userSchema);

// export default User;
module.exports=User;