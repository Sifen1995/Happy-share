const path = require("path");
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

// Load environment variables
require("dotenv").config({
  path: path.resolve(__dirname, ".env"),
});

const authRoutes = require("./src/routes/authRoutes");
const postRoutes = require("./src/routes/postRoutes");

const app = express();
const port = process.env.PORT || 3000;

// --- DATABASE CONNECTION ---
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Verify connection and log success
pool.connect((err, client, release) => {
  if (err) {
    return console.error("❌ Database connection failed:", err.stack);
  }
  console.log("✅ Database connected successfully to:");
  release();
});

// Export pool so you can use it in your controllers
app.set("db", pool);

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- ROUTES ---
app.get("/health", (_req, res) => {
  res.json({ status: "ok", message: "Server is healthy" });
});

// Routes are prefixed here
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

// --- ERROR HANDLING ---
app.use((err, _req, res, _next) => {
  console.error("🔥 Server Error:", err);
  res.status(500).json({
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : {},
  });
});

app.listen(port, () => {
  console.log(`🚀 API running on http://localhost:${port}`);
});
