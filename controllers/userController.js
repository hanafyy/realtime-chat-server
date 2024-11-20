const UserModel = require("../models/user");

const addUser = async (req, res) => {
  try {
    const { username } = req.body;
    const newUser = await UserModel.createUser(username);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addUser };
