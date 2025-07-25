const User = require("../models/userModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcrypt");

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username, createdAt } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({ message: "User already exists" });
    }

    const user = await User.create({ email, password, username, createdAt });

    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None", // must be None for cross-site
      path: "/",
      //domain: ".vercel.app",  // <-- allows sharing across both subdomains
    });


    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });

    next();

  } catch (error) {
    console.error(error);
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if(!email || !password ){
      return res.json({message:'All fields are required'})
    }


    const user = await User.findOne({ email });
    
    if(!user){
      return res.json({message:'Incorrect email' }) 
    }

    const auth = await bcrypt.compare(password,user.password)

    if (!auth) {
      return res.json({message:'Incorrect password' }) 
    }

     const token = createSecretToken(user._id);
     res.cookie("token", token, {
       httpOnly: true,
       secure: true,
       sameSite: "None", // must be None for cross-site
       path: "/",
       //domain: ".vercel.app",  // <-- allows sharing across both subdomains
     });


     res.status(201).json({ message: "User logged in successfully", success: true });

  } catch (error) {
    console.error(error);
  }
}

module.exports.Logout = (req, res) => {
  try {
    res.clearCookie("token", { httpOnly: true, sameSite: "strict" });
    res.status(200).json({ message: "Logged out successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
