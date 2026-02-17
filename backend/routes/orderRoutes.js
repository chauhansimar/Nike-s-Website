const express = require("express");
const router = express.Router();
const Order = require("../routes/orderRoutes");
const Cart = require("../models/Cart");
const protect = require("../middleware/authMiddleware");

router.post("/place", protect, async (req, res) => {
  const cart = await Cart.findOne({ user: req.user });

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  const totalAmount = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const order = await Order.create({
    user: req.user,
    items: cart.items,
    totalAmount,
  });

  // Clear cart after order
  await Cart.findOneAndDelete({ user: req.user });

  res.status(201).json(order);
});


router.get("/", protect, async (req, res) => {
  const orders = await Order.find({ user: req.user }).sort({ createdAt: -1 });
  res.json(orders);
});
module.exports = router;

