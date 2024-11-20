const db = require("./db");

const createChat = (user1_id, user2_id) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO chats (user1_id, user2_id) VALUES (?, ?)`;
    db.run(query, [user1_id, user2_id], function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, user1_id, user2_id });
    });
  });
};

const getChatsByUserId = (userId) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM chats WHERE user1_id = ? OR user2_id = ?`;
    db.all(query, [userId, userId], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

const getChatsWithDetails = (userId) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
          c.id as chat_id,
          u1.username as user1_username,
          u2.username as user2_username,
          m.content,
          m.user_id as message_user_id
      FROM 
          chats c
          JOIN users u1 ON c.user1_id = u1.id
          JOIN users u2 ON c.user2_id = u2.id
          LEFT JOIN messages m ON m.chat_id = c.id
          AND m.id = (
              SELECT MAX(m2.id)
              FROM messages m2
              WHERE m2.chat_id = c.id
          )
      WHERE 
          c.user1_id = ? OR c.user2_id = ?
      ORDER BY 
          m.id ASC;
    `;
    db.all(query, [userId, userId], (err, rows) => {
      if (err) {
        console.error("Error fetching chat details:", err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

module.exports = {
  createChat,
  getChatsByUserId,
  getChatsWithDetails,
};
