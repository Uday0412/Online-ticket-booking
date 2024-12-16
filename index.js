require('dotenv').config();  // Load environment variables from .env file

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

// Connect to MongoDB using the environment variable
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Connection events
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected successfully.");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// Define Ticket Schema
const ticketSchema = new mongoose.Schema({
  name: String,
  email: String,
  type: String,
  date: String,
  destination: String,
});

const Ticket = mongoose.model("Ticket", ticketSchema);

// API to handle booking
app.post("/book", async (req, res) => {
  try {
    const ticket = new Ticket(req.body);
    await ticket.save();
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

// Start the server using the environment variable for port
const PORT = process.env.PORT || 3000;  // Default to 3000 if not specified
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
