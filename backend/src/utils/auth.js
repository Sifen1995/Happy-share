const jwt = require("jsonwebtoken");

function signAccessToken(user) {
  const payload = {
    sub: user.id,
    username: user.username,
    email: user.email,
  };

  return jwt.sign(payload, process.env.JWT_SECRET || "dev-secret", {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
}

module.exports = {
  signAccessToken,
};
