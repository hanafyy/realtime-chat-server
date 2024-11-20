const db = require("./db");
const bcrypt = require("bcrypt");

const createUser = (username, password) => {
  return new Promise((resolve, reject) => {
    const hash = bcrypt.hashSync(password, 10); // Hash password before storing it
    const query = `INSERT INTO users (username, password) VALUES (?, ?)`;
    db.run(query, [username, hash], function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, username });
    });
  });
};

const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM users`;
    db.all(query, [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM users WHERE id = ?";
    db.get(query, [id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

const findUserByUsername = (username) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM users WHERE username = ?`;
    db.get(query, [username], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

module.exports = { createUser, getAllUsers, findUserByUsername, getUserById };
