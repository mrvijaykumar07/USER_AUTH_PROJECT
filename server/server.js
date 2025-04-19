const express = require("express");
const connectDB = require("./config/connectDB");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoute");
require("dotenv").config();

const app = express();

// ✅ Middleware Order Matters
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // ✅ Specific frontend URL
  res.header("Access-Control-Allow-Credentials", "true"); // ✅ Allow credentials
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// ✅ CORS Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

connectDB();

app.use("/api", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(` Your Server is running on http://localhost:${process.env.PORT}`);
});
