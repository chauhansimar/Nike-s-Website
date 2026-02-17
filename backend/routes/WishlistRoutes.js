const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const Wishlist = require("../models/Wishlist");

// GET USER WISHLIST
router.get("/", protect, async (req, res) => {
  const items = await Wishlist.find({ user: req.user._id });
  res.json(items);
});

// ADD TO WISHLIST
router.post("/", protect, async (req, res) => {
  const { productId, name, price, image } = req.body;

  const newItem = new Wishlist({
    user: req.user._id,
    productId,
    name,
    price,
    image,
  });

  await newItem.save();
  res.status(201).json(newItem);
});

// DELETE ITEM
router.delete("/:id", protect, async (req, res) => {
  await Wishlist.findByIdAndDelete(req.params.id);
  res.json({ message: "Removed from wishlist" });
});

module.exports = router;
