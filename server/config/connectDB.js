const mongoose = require('mongoose');
require('dotenv').config();

const URL = process.env.ATLAS_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(URL, {
            serverSelectionTimeoutMS: 10000, // Timeout after 10 seconds if MongoDB is unreachable
        });
        console.log("✅ MongoDB successfully connected to Atlas");
    } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error.message);
        process.exit(1); // Stop the server if DB connection fails
    }
};

module.exports = connectDB;
