
const User = require("../models/userModel");  // ✅ Ensure this is present
const bcrypt = require("bcrypt"); // If using bcrypt
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existUser = await User.findOne({ email });
  
        if (!existUser) {
            return res.json({
                success: false,
                message: "Invalid! If you are new, please Register First",
            });
        }
  
        // ❌ Check if user is verified
        if (!existUser.isVerified) {
            return res.json({
                success: false,
                message: "Please verify your email first!",
                verifyEmail: true,  // ✅ Send this flag for frontend
            });
        }
  
        const isCorrectPW = await bcrypt.compare(password, existUser.password);
        if (!isCorrectPW) {
            return res.json({ success: false, message: "Invalid password" });
        }
  
        const token = jwt.sign({ id: existUser._id }, "bijay#text", {
            expiresIn: "7d",
        });
  
        console.log("Generated Token:", token); // ✅ Debugging ke liye
  

          
        res.cookie("token", token, {
            httpOnly: true,
            secure: true, // Set to true in production to send cookies only over HTTPS
            sameSite: "none", // Or "none" if needed
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          });
          



        return res.json({
            success: true,
            message: "You logged in successfully",
            name: existUser.fname,
        });
  
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
  };
  
  module.exports = { login };
  