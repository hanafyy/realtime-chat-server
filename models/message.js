const db = require("./db");

const createMessage = (content, chatId, userId) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO messages (user_id, chat_id, content) VALUES (?, ?, ?)`;
    db.run(query, [userId, chatId, content], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({
          id: this.lastID,
          user_id: userId,
          chat_id: chatId,
          content,
          timestamp: new Date(),
        });
      }
    });
  });
};

const getMessagesByChatId = (chatId) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM messages WHERE chat_id = ?;`;
    db.all(query, [chatId], (err, messages) => {
      if (err) {
        reject(err);
      } else {
        resolve(messages);
      }
    });
  });
};
module.exports = {
  createMessage,
  getMessagesByChatId,
};
