const express = require("express");
const router = express.Router();
const ChatModel = require("../models/chat");
const MessageModel = require("../models/message");

// Middleware to parse JSON bodies
router.use(express.json());

// Route to get all chats for a specific user
router.get("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const chats = await ChatModel.getChatsByUserId(userId);
    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to create a new chat between two users
router.post("/", async (req, res) => {
  try {
    const { user1_id, user2_id } = req.body;
    const newChat = await ChatModel.createChat(user1_id, user2_id);
    res.status(201).json(newChat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to get all messages in a specific chat
router.get("/:chatId/messages", async (req, res) => {
  try {
    const chatId = req.params.chatId;
    const messages = await MessageModel.getMessagesByChatId(chatId);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const chats = await getChatsByUserId(userId);
    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/detailed/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const chats = await ChatModel.getChatsWithDetails(userId);
    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
