const express = require("express");
const router = express.Router();
const postController = require("../../controllers/PostController");
const upload = require("../../middlewares/multer");
router.post("/create", upload, postController.createPost);
module.exports = router;
