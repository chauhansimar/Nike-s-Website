import express from "express";
import Order from "./models/Order.js";

const router = express.Router();

router.post("/place", async (req, res) => {
  try {
    const { userId, items, totalAmount } = req.body;

    const newOrder = new Order({
      userId,
      items,
      totalAmount,
    });

    await newOrder.save();

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: "Order failed" });
  }
});

router.get("/history/:userId", async (req, res) => {
  try {
    const orders = await Order.find({
      userId: req.params.userId,
    }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders" });
  }
});


export default router;
