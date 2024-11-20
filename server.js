require("dotenv").config(); // Load environment variables

const express = require("express");
const cors = require("cors");
const Pusher = require("pusher");
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Enable CORS for all origins
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
  })
);

// Initialize Pusher with credentials from the .env file
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});

// Endpoint to receive data and notify the frontend
app.post("/send-data", (req, res) => {
  const { data } = req.body;

  console.log("Received data:", data);

  pusher
    .trigger("notifications", "data-received", { data })
    .then(() => {
      res.status(200).send({ message: "Data received and notification sent!" });
    })
    .catch((err) => {
      console.error("Error triggering Pusher event:", err);
      res
        .status(500)
        .send({ message: "Failed to send notification", error: err });
    });
});

// Root route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
