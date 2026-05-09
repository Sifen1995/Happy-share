const express = require("express");
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const postController = require("../controllers/postController");

const router = express.Router();

router.get("/", postController.listPosts);
router.get("/random", postController.randomPost);
router.get("/feeling-low", postController.listFeelingLowPosts);
router.get("/mine", protect, postController.listMyPosts);

router.post("/", protect, upload.single("image"), postController.createPost);
router.delete("/:id", protect, postController.deletePost);
router.post("/:id/heart", protect, postController.toggleHeart);

module.exports = router;
