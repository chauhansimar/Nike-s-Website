const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const protect = require("../middleware/authMiddleware");

// ================================
// GET CONTACTS (ADMIN ONLY)
router.get("/", protect, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(messages);

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});


// POST CONTACT (PUBLIC)
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.status(201).json({
      success: true,
      message: "Contact stored successfully",
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});


// DELETE (ADMIN ONLY)
router.delete("/:id", protect, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    await Contact.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
});


module.exports = router;
