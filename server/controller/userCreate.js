const User = require("../models/userModel");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const transporter = require("../config/nodemailer");

require("dotenv").config();



//create
const create = async (req, res) => {
    try {
      const existUser = await User.findOne({ email: req.body.email });
  
      if (existUser) {
        return res.status(400).json({
          success: false,
          message: "User already exists with this email",
        });
      }
  
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const userData = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: hashedPassword,
      });
  
      const savedData = await userData.save();
      if (!savedData) {
        return res.status(400).json({ message: "Failed to save user" });
      }
      console.log("User saved successfully:", savedData);
      console.log("Sending email to:", req.body.email);
      // Generate JWT Token
      const token = jwt.sign({ id: savedData._id }, "bijay#text", {
        expiresIn: "7d",
      });
      console.log("Token generated successfully...");
      console.log(token, token);
      res.cookie("token", token, {
        httpOnly: true,
        secure:false,
        sameSite:  "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      console.log("User saved successfully:", savedData);
      console.log("Sending email to:", req.body.email);
  
      const mailOptions = {
        from:process.env.GMAIL_USER,
        to: req.body.email,
        subject: "Account Created Successfully 🎉",
        text: `Thank you ${req.body.fname} ${req.body.lname}! Your account was created successfully with ${req.body.email}.`, // Plain text
        html: `<p>Thank you <b>${req.body.fname} ${req.body.lname}</b>! Your account has been created successfully with <b>${req.body.email}</b>.</p>`, // HTML version
  
      };
      
  
      console.log("Transporter Object:", transporter);
      if (!transporter || typeof transporter.sendMail !== "function") {
        console.error("❌ Error: transporter is not initialized correctly.");
      }

  
      // Send Email (but don't block the response if it fails)
  
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error("❌ Error sending test email:", err);
        } else {
          console.log(`✅ Email sent successfully to ${req.body.email}:`, info.response);
        }
      });
  
      return res.status(201).json({
        success: true,
        message: "Register successful & Now you are logged in",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  };

  module.exports = {
    create
  };
  