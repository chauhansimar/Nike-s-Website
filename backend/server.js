const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", require("./routes/AuthRoutes"));


// Test route
app.get("/", (req, res) => {
  res.send("Auth Server Running 🚀");
});

// Start server
const PORT = process.env.PORT || 5000;
// const connectDB = require("./config/db");
// connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
