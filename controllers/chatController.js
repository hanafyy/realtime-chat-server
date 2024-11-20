const ChatModel = require("../models/chat");
const MessageModel = require("../models/message"); // If you need to fetch messages

const getChats = async (req, res) => {
  try {
    const userId = req.params.userId;
    const chats = await ChatModel.getChatsByUserId(userId);
    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createChat = async (req, res) => {
  try {
    const { user1_id, user2_id } = req.body;
    const newChat = await ChatModel.createChat(user1_id, user2_id);
    res.status(201).json(newChat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMessagesInChat = async (req, res) => {
  try {
    const chatId = req.params.chatId;
    const messages = await MessageModel.getMessagesByChatId(chatId);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = {
  getChats,
  createChat,
  getMessagesInChat,
};
