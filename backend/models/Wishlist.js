const express = require("express");

const router = express.Router();

const Wishlist = require("../models/Wishlist");

const protect = require("../middleware/authMiddleware");


// ✅ ADD TO WISHLIST
router.post("/", protect, async (req, res) => {

  try {

    const {
      productId,
      name,
      price,
      image,
    } = req.body;

    const wishlistItem = new Wishlist({
      user: req.user._id,
      productId,
      name,
      price,
      image,
    });

    await wishlistItem.save();

    res.status(201).json({
      message: "Added to wishlist ❤️",
      wishlistItem,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});


// ✅ GET USER WISHLIST
router.get("/", protect, async (req, res) => {

  try {

    const items = await Wishlist.find({
      user: req.user._id,
    });

    res.json(items);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});


// ✅ REMOVE ITEM
router.delete("/:id", protect, async (req, res) => {

  try {

    await Wishlist.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Removed from wishlist",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});

module.exports = router;