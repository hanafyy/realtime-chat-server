const MessageModel = require("../models/message");

const addMessage = async (req, res) => {
  try {
    const { chat_id, user_id, content } = req.body;
    const newMessage = await MessageModel.createMessage(
      chat_id,
      user_id,
      content
    );
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const getMessages = async (req, res) => {
  try {
    const chat_id = req.params.chat_id;
    const messages = await MessageModel.getMessagesByChatId(chat_id);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addMessage,
  getMessages,
};
