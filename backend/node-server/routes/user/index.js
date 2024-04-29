const express = require("express");
const router = express.Router();
const userController = require("../../controllers/UserController");
const { verifyAccessToken } = require("../../middlewares/verifyToken");

// router.get("/:id/getPostUser", verifyAccessToken, userController.getPostUser);
// router.get("/getCommentUser", verifyAccessToken, userController.getCommentUser);
module.exports = router;
