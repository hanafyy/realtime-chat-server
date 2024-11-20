require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const { createMessage } = require("./models/message");
const app = express();
const server = http.createServer(app);
// Pass the server instance to socket.io

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" })); // Ensure this includes all origins your front-end might use

// Configure CORS for Socket.IO
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173", // Include all needed origins or use "*" to allow all
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
}); // Ensure to adjust this as per your client's URL in production

const userRoutes = require("./routes/usersRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");

app.use("/users", userRoutes);
app.use("/chats", chatRoutes);
app.use("/messages", messageRoutes);

// Handle socket connection
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

  // Listen for "sendMessage" events from clients
  socket.on("sendMessage", (data) => {
    // Destructure data received from client
    const { content, chatId, timestamp, senderId } = data;

    // Store the message in the database
    createMessage(content, chatId, senderId, timestamp)
      .then((message) => {
        console.log(message, "the data going to be sent");
        // After successful insertion, emit the message to all clients
        io.emit("receiveMessage", message);
      })
      .catch((err) => {
        console.error("Failed to save message:", err);
        // Optionally handle errors, e.g., by sending a status back to the sender
        socket.emit("errorOnMessage", "Failed to save message");
      });
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
