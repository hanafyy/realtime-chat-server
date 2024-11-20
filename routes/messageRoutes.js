const express = require("express");
const router = express.Router();

const MessageModel = require("../models/message");

router.get("/:chatId", async (req, res) => {
  try {
    console.log("Fetching messages for chat ID:", req.params.chatId); // Check if the chatId is what you expect
    const messages = await MessageModel.getMessagesByChatId(req.params.chatId);
    console.log(messages); // Check what data is being returned to the route
    res.json(messages);
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
