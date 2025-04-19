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

const allowedOrigins = [
  "http://localhost:3000", // Local development
  "https://user-auth-project.vercel.app", // Production frontend
];

app.use((req, res, next) => {
  const origin = req.headers.origin;

  // Agar origin allowed list mein hai, toh allow karna
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Credentials", "true"); // ✅ Allow credentials
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});


// ✅ CORS Middleware
// Backend: Express.js CORS setup
app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true); // Allow the origin
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow credentials like cookies
  })
);



connectDB();

app.use("/api", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(` Your Server is running on http://localhost:${process.env.PORT}`);
});

app.get("/", (req, res) => {
  res.send("Backend is running!");
});