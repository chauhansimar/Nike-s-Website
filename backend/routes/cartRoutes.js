const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const protect = require("../middleware/authMiddleware");

// ADD TO CART
router.post("/add", protect, async (req, res) => {
  const { productId, title, price, image } = req.body;

  let cart = await Cart.findOne({ user: req.user });

  if (!cart) {
    cart = await Cart.create({
      user: req.user,
      items: [{ productId, title, price, image }],
    });
  } else {
    const itemIndex = cart.items.findIndex(
      (item) => item.productId === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += 1;
    } else {
      cart.items.push({ productId, title, price, image });
    }
    await cart.save();
  }

  res.json(cart);
});

// GET CART
router.get("/", protect, async (req, res) => {
  const cart = await Cart.findOne({ user: req.user });

  if (!cart) {
    return res.json({ items: [], total: 0 });
  }

  const total = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  res.json({ items: cart.items, total });
});

// UPDATE QUANTITY
router.put("/update", protect, async (req, res) => {
  const { productId, quantity } = req.body;

  const cart = await Cart.findOne({ user: req.user });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  const item = cart.items.find(
    (item) => item.productId === productId
  );

  if (!item) return res.status(404).json({ message: "Item not found" });

  item.quantity = quantity;
  await cart.save();

  res.json(cart);
});

// REMOVE ITEM
router.delete("/remove/:productId", protect, async (req, res) => {
  const cart = await Cart.findOne({ user: req.user });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.items = cart.items.filter(
    (item) => item.productId !== req.params.productId
  );

  await cart.save();
  res.json(cart);
});

// CLEAR CART
router.delete("/clear", protect, async (req, res) => {
  await Cart.findOneAndDelete({ user: req.user });
  res.json({ message: "Cart cleared successfully" });
});

module.exports = router;
