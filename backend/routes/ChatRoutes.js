const express = require("express");
const OpenAI = require("openai");
const mongoose = require("mongoose");

require("dotenv").config();

const router = express.Router();

/* =============================
   CHAT ANALYTICS MODEL
============================= */

const chatSchema = new mongoose.Schema({
  message: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const ChatLog = mongoose.model("ChatLog", chatSchema);

/* =============================
   OPENAI / GROQ CONFIG
============================= */

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

/* =============================
   STORE KNOWLEDGE BASE
============================= */

const storeInfo = `
Nike Store Information

Shipping
• Free delivery above ₹5000
• Delivery time 3–5 days

Returns
• 30-day return policy
• Items must be unused

Popular Products
• Nike Air Max
• Nike Pegasus
• Nike Revolution

Categories
• Running
• Training
• Lifestyle
`;

/* =============================
   CHATBOT ROUTE
============================= */

router.post("/", async (req, res) => {

  try {

    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        reply: "Please provide a valid message."
      });
    }

    /* SAVE USER QUERY FOR ANALYTICS */

    await ChatLog.create({
      message: message
    });

    const lowerMsg = message.toLowerCase();

    /* QUICK RESPONSES */

    if (lowerMsg.includes("shipping")) {
      return res.json({
        reply:
`• Free shipping above ₹5000
• Delivery within 3–5 days`
      });
    }

    if (lowerMsg.includes("return")) {
      return res.json({
        reply:
`• 30-day return policy
• Item must be unused`
      });
    }

    /* AI RESPONSE */

    const completion = await openai.chat.completions.create({

      model: "llama-3.1-8b-instant",

      temperature: 0.4,
      max_tokens: 120,

      messages: [
        {
          role: "system",
          content: `
You are a premium Nike e-commerce assistant.

Store Knowledge:
${storeInfo}

Rules
• Maximum 4 lines
• Use bullet points
• No long explanations
• Simple language
• Confident tone
• Do NOT ask follow-up questions
`
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    res.json({
      reply:
        completion.choices[0]?.message?.content ||
        "No response generated."
    });

  } catch (error) {

    console.error("CHAT ERROR:", error.response?.data || error.message);

    res.status(500).json({
      reply: "AI service temporarily unavailable. Please try again."
    });

  }

});

/* =============================
   CHAT ANALYTICS ROUTE
============================= */

router.get("/analytics", async (req, res) => {

  try {

    const totalChats = await ChatLog.countDocuments();

    const recentChats = await ChatLog
      .find()
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      totalChats,
      recentChats
    });

  } catch (error) {

    res.status(500).json({
      error: "Analytics fetch failed"
    });

  }

});

module.exports = router;