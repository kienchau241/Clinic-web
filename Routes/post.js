const express = require("express");
const router = express.Router();
const postController = require("../Controller/post");
const StaticData = require("../utils/StaticData.js");
const authController = require("../Controller/auth");

router
  .route("/")
  .get(postController.getAllPosts)
  .post(postController.createPost);

router
  .route("/:id")
  .patch(postController.updateReview)
  .delete(postController.deletePost)
  .get(postController.getPost);

module.exports = router;
