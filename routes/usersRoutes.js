const express = require("express");
const router = express.Router();

const {
  createUser,
  findUserByUsername,
  getUserById,
  getAllUsers,
} = require("../models/user");

const bcrypt = require("bcrypt");

// Middleware to parse JSON bodies
router.use(express.json());

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Register a new user
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      return res.status(409).send("Username already taken");
    }
    const newUser = await createUser(username, password);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// User login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await findUserByUsername(username);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).send("Invalid credentials");
    }
    // Corrected: Combine message and user data into a single JSON object
    res.status(201).json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
