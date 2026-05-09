const db = require("../config/database");

const DEFAULT_BANNED_WORDS = ["spam", "scam", "fake giveaway"];
const BANNED_WORDS = (
  process.env.BANNED_WORDS
    ? process.env.BANNED_WORDS.split(",")
    : DEFAULT_BANNED_WORDS
)
  .map((word) => word.trim().toLowerCase())
  .filter(Boolean);

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function findBannedWord(text) {
  const normalizedText = String(text || "").toLowerCase();

  return BANNED_WORDS.find((word) => {
    const pattern = new RegExp(`\\b${escapeRegExp(word)}\\b`, "i");
    return pattern.test(normalizedText);
  });
}

async function listPosts(req, res, next) {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const pageSize = 10;
    const offset = (page - 1) * pageSize;

    const { rows } = await db.query(
      `SELECT p.id, p.user_id, p.text, p.category, p.link, p.image_url, p.created_at,
              u.username,
              COALESCE(h.hearts_count, 0)::INTEGER AS hearts_count
       FROM posts p
       JOIN users u ON u.id = p.user_id
       LEFT JOIN (
         SELECT post_id, COUNT(*) AS hearts_count
         FROM hearts
         GROUP BY post_id
       ) h ON h.post_id = p.id
       ORDER BY p.created_at DESC
       LIMIT $1 OFFSET $2`,
      [pageSize, offset]
    );

    return res.json({
      page,
      pageSize,
      items: rows,
    });
  } catch (error) {
    return next(error);
  }
}

async function randomPost(_req, res, next) {
  try {
    const { rows } = await db.query(
      `SELECT p.id, p.user_id, p.text, p.category, p.link, p.image_url, p.created_at, u.username
       FROM posts p
       JOIN users u ON u.id = p.user_id
       ORDER BY RANDOM()
       LIMIT 1`
    );

    if (!rows[0]) {
      return res.status(404).json({ message: "No posts found" });
    }

    return res.json(rows[0]);
  } catch (error) {
    return next(error);
  }
}

async function createPost(req, res, next) {
  try {
    const { text, category, link } = req.body;
    if (!text || !category) {
      return res.status(400).json({ message: "text and category are required" });
    }

    const matchedBannedWord = findBannedWord(text);
    if (matchedBannedWord) {
      return res.status(400).json({
        message: "Post contains banned language",
        bannedWord: matchedBannedWord,
      });
    }

    const imageUrl = req.file ? req.file.path : req.body.image_url || null;

    const { rows } = await db.query(
      `INSERT INTO posts (user_id, text, category, link, image_url)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, user_id, text, category, link, image_url, created_at`,
      [req.user.id, text, category, link || null, imageUrl]
    );

    return res.status(201).json(rows[0]);
  } catch (error) {
    return next(error);
  }
}

async function deletePost(req, res, next) {
  try {
    const postId = parseInt(req.params.id, 10);
    if (!postId) {
      return res.status(400).json({ message: "Invalid post id" });
    }

    const { rows } = await db.query("SELECT user_id FROM posts WHERE id = $1", [
      postId,
    ]);
    if (!rows[0]) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (rows[0].user_id !== req.user.id) {
      return res.status(403).json({ message: "Only the author can delete this post" });
    }

    await db.query("DELETE FROM posts WHERE id = $1", [postId]);
    return res.json({ message: "Post deleted" });
  } catch (error) {
    return next(error);
  }
}

async function listMyPosts(req, res, next) {
  try {
    const { rows } = await db.query(
      `SELECT id, user_id, text, category, link, image_url, created_at
       FROM posts
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [req.user.id]
    );
    return res.json(rows);
  } catch (error) {
    return next(error);
  }
}

async function toggleHeart(req, res, next) {
  try {
    const postId = parseInt(req.params.id, 10);
    if (!postId) {
      return res.status(400).json({ message: "Invalid post id" });
    }

    const exists = await db.query("SELECT id FROM posts WHERE id = $1", [postId]);
    if (exists.rowCount === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    const heart = await db.query(
      "SELECT id FROM hearts WHERE post_id = $1 AND user_id = $2",
      [postId, req.user.id]
    );

    let hearted;
    if (heart.rowCount > 0) {
      await db.query("DELETE FROM hearts WHERE post_id = $1 AND user_id = $2", [
        postId,
        req.user.id,
      ]);
      hearted = false;
    } else {
      await db.query("INSERT INTO hearts (post_id, user_id) VALUES ($1, $2)", [
        postId,
        req.user.id,
      ]);
      hearted = true;
    }

    const count = await db.query(
      "SELECT COUNT(*)::INTEGER AS hearts_count FROM hearts WHERE post_id = $1",
      [postId]
    );

    return res.json({
      postId,
      hearted,
      heartsCount: count.rows[0].hearts_count,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  listPosts,
  randomPost,
  createPost,
  deletePost,
  listMyPosts,
  toggleHeart,
};
