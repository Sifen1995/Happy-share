const { Pool } = require('pg');
require('dotenv').config();

/**
 * Database connection pool configuration
 * Uses the DATABASE_URL from your .env file
 */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Recommended for local development to avoid SSL errors
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Test the connection on startup
pool.on('connect', () => {
  console.log('✅ Connected to the HappyShare PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};