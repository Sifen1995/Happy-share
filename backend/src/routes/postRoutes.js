const express = require("express");
const multer = require("multer");
const authMiddleware = require("../middleware/authMiddleware");
const postController = require("../controllers/postController");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.get("/", postController.listPosts);
router.get("/random", postController.randomPost);
router.get("/mine", authMiddleware, postController.listMyPosts);

router.post("/", authMiddleware, upload.single("image"), postController.createPost);
router.delete("/:id", authMiddleware, postController.deletePost);
router.post("/:id/heart", authMiddleware, postController.toggleHeart);

module.exports = router;
