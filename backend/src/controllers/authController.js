const bcrypt = require("bcryptjs");
const db = require("../config/database");
const { signAccessToken } = require("../utils/auth");
const { revokeToken } = require("../utils/tokenStore");

async function register(req, res, next) {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "username, email, and password are required" });
    }

    const existing = await db.query(
      "SELECT id FROM users WHERE email = $1 OR username = $2 LIMIT 1",
      [email, username]
    );
    if (existing.rowCount > 0) {
      return res
        .status(409)
        .json({ message: "User with this email or username already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const result = await db.query(
      `INSERT INTO users (username, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, username, email, created_at`,
      [username, email, passwordHash]
    );

    const user = result.rows[0];
    const token = signAccessToken(user);

    return res.status(201).json({
      user,
      token,
    });
  } catch (error) {
    return next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body; 
    if (!email || !password) {
      return res.status(400).json({ message: "email and password are required" });
    }

    const result = await db.query(
      `SELECT id, username, email, password_hash, created_at
       FROM users
       WHERE email = $1
       LIMIT 1`,
      [email]
    );

    if (result.rowCount === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = result.rows[0];
    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = signAccessToken(user);
    delete user.password_hash;

    return res.json({
      user,
      token,
    });
  } catch (error) {
    return next(error);
  }
}

function logout(req, res) {
  const token = req.user.token;
  revokeToken(token);
  return res.json({ message: "Logged out successfully" });
}

module.exports = {
  register,
  login,
  logout,
};
