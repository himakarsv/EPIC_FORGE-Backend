const User=require("../models/user");
const Product=require("../models/product");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
const Login=async(req,res)=>{

    const { email, password, role } = req.body;

  try {
    const user = await User.findOne({ email, role });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    // Generate JWT and send it
    const token = jwt.sign({ id: user._id,username:user.username, role: user.role }, process.env.JWT_SECRET,{ expiresIn: '1h' });
    res.json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }


}

const Register=async(req,res)=>{
    const { username, email, password, role } = req.body;

  if (!['seller', 'buyer'].includes(role)) {
    return res.status(400).json({ error: 'Invalid user type' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword, role });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
    console.log("user created");
} catch (error) {
    res.status(500).json({ error: error.message });
}
}



module.exports={Login,Register};