const mongoose = require("mongoose");
const transporter = require("../config/nodemailer");
const User = require("../models/userModel");
require("dotenv").config();

// ✅ Function to send OTP
const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: "Email is required" });

    let user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    if (user.isVerified) {
      return res.status(400).json({ success: false, message: "User already verified" });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.verifyOtp = otp;
    user.verifyOtpExpirAt = Date.now() + 5 * 60 * 1000; // OTP valid for 5 min
    await user.save();

    // Send email
    await transporter.sendMail({
      from:process.env.GMAIL_USER,
      to: email,
      subject: "Email Verification Code",
      text: `Your OTP for email verification is: ${otp}`,
      html: `<p>Your OTP for email verification is: <strong>${otp}</strong></p><p>This OTP is valid for 5 minutes.</p>`
    });

    return res.status(200).json({ success: true, message: "OTP sent successfully!", email });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
};

// ✅ Function to verify OTP
const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ success: false, message: "Email and OTP are required" });

    let user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    if (Date.now() > user.verifyOtpExpirAt) {
      return res.status(400).json({ success: false, message: "OTP expired. Please request a new one." });
    }

    if (user.verifyOtp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP. Try again." });
    }

    // OTP is correct → Update user as verified
    user.isVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpirAt = 0;
    await user.save();

    return res.status(200).json({ success: true, message: "Email verified successfully!" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res.status(500).json({ success: false, message: "Failed to verify OTP" });
  }
};

module.exports = { sendOTP, verifyOTP };
