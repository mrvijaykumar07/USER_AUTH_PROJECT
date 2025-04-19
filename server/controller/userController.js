const User = require("../models/userModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();



// Function for Logout User
const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res
      .status(200)
      .json({ success: true, message: "Logout successful" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Function to Get All Users
const getallUser = async (req, res) => {
  try {
    const users = await User.find();
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to Get One User
const getOneUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Function to Update User
const update = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: req.body }, // Update fields dynamically
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Function to Delete User
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};






const userCheckOnCookie = async (req, res) => {
    const token = req.cookies.token;  // ✅ Get token from cookies

    if (!token) {
        return res.json({ authenticated: false, message: "Token not found" });
    }

    try {
        const tokenDecode = jwt.verify(token, "bijay#text");  // ✅ Verify token
        return res.json({ authenticated: true, userId: tokenDecode.id });
    } catch (error) { 
        return res.json({ authenticated: false, message: error.message }); 
    }
};

// ✅ Ensure this is included in module.exports
module.exports = {
    logout,
    getallUser,
    getOneUser,
    update,
    deleteUser,
    userCheckOnCookie,
};
