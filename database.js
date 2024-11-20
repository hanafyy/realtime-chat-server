const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("chatapp.db", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to SQLite database");

    // Create Users table
    db.run(
      `
        CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      )
    `,
      (err) => {
        if (err) {
          console.error("Error creating users table:", err.message);
        } else {
          console.log("Users table ready");
        }
      }
    );

    // Create Messages table
    db.run(
      `
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      chat_id INTEGER,
      content TEXT NOT NULL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (chat_id) REFERENCES chats(id)
    )
  `,
      (err) => {
        if (err) {
          console.error("Error creating new messages table:", err.message);
        } else {
          console.log("New messages table ready");
        }
      }
    );

    db.run(
      `
      CREATE TABLE IF NOT EXISTS chats (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user1_id INTEGER NOT NULL,
      user2_id INTEGER NOT NULL,
      FOREIGN KEY (user1_id) REFERENCES users(id),
      FOREIGN KEY (user2_id) REFERENCES users(id)
    )
  `,
      (err) => {
        if (err) {
          console.error("Error creating chats table:", err.message);
        } else {
          console.log("Chats table ready");
        }
      }
    );
  }
});

module.exports = db;
