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



app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
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