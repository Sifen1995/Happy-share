require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./src/config/database"); // Import the database connection pool

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL || "*" })); // Configure CORS as per SRS
app.use(express.json()); // Allows parsing of application/json

// Health Check Route
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "HappyShare",
    timestamp: new Date().toISOString(),
  });
});

// Root Route
app.get("/", (req, res) => {
  res.json({
    message: "Happy Share backend is running with Express",
    endpoints: {
      health: "/health",
      posts: "/api/posts",
    },
  });
});

// Start Server after testing DB connection
const startServer = async () => {
  try {
    // Confirm DB connection on Port 5434
    await db.query("SELECT NOW()");
    console.log("✅ Connected to PostgreSQL (Port 5434)");

    app.listen(PORT, () => {
      console.log(`🚀 Express server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1);
  }
};

startServer();
