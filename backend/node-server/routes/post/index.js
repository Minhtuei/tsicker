const express = require("express");
const router = express.Router();
const postController = require("../../controllers/PostController");
const { verifyAccessToken } = require("../../middlewares/verifyToken");
const upload = require("../../middlewares/multer");
router.post("/create", upload, postController.createPost);
router.post("/getAll", verifyAccessToken, postController.getAllPosts);
router.get("/:id", verifyAccessToken, postController.getPost);
module.exports = router;
