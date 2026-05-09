const { Pool } = require("pg");
const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../../.env")
});

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in .env");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function testDatabaseConnection() {
  const client = await pool.connect();
  try {
    await client.query("SELECT 1");
  } finally {
    client.release();
  }
}

module.exports = {
  pool,
  testDatabaseConnection
};
