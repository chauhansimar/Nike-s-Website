const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.post("/add", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to add product" });
  }
});
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

router.get("/category/:type", async (req, res) => {
  const products = await Product.find({
    category: req.params.type,
  });

  res.json(products);
});

router.get("/sale", async (req, res) => {
  const products = await Product.find({ isOnSale: true });
  res.json(products);
});
