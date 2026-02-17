const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

// ✅ IMPORT ROUTES
const contactRoute = require("./routes/ContactRoute");
const authRoutes = require("./routes/authRoutes");
const wishlistRoutes = require("./routes/WishlistRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");


// ==================
// MIDDLEWARE
// ==================
app.use(cors());
app.use(express.json());

// ==================
// ROUTES
// ==================
app.use("/api/auth", authRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/contact", contactRoute); 
app.use("/api/order", orderRoutes);  // ✅ ADDED HERE

// ==================
// MONGODB CONNECTION
// ==================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => {
    console.error("MongoDB connection failed ❌", err.message);
    process.exit(1);
  });
  

// ==================
// TEST ROUTE
// ==================
app.get("/", (req, res) => {
  res.send("Backend running successfully 🚀");
});

// ==================
// SERVER START
// ==================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
