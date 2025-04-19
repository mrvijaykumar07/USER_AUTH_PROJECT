const express = require("express");
const { logout, getallUser, getOneUser, update, deleteUser, userCheckOnCookie } = require("../controller/userController");
const { create } = require("../controller/userCreate");
const { login } = require("../controller/userLogin");
const { sendOTP, verifyOTP } = require("../controller/userVerify");


const route = express.Router();

route.post("/create", create);
route.post("/login", login);
route.get("/logout", logout);

route.post("/sendOTP", sendOTP);
route.post("/verifyOTP", verifyOTP);

route.get("/getall", getallUser);
route.get("/getoneuser/:id", getOneUser);
route.put("/update/:id", update);
route.delete("/deleteuser/:id", deleteUser);

// ✅ Add this route for checking authentication
route.get("/check-auth", userCheckOnCookie);

module.exports = route;
