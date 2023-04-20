const express = require("express");
const router = express.Router();
const postController = require("../Controller/post");
const StaticData = require("../utils/StaticData.js");
const authController = require("../Controller/auth");

router
  .route("/")
  .get(postController.getAllPosts)
  .post(postController.createPost);

router.route("/storePost").get(postController.storePost);

router.route("/create").get(postController.creatShow);

router
  .route("/:id")
  .patch(postController.updatepost)
  .delete(postController.deletePost)
  .get(postController.getPost);

router.route("/:id/edit").get(postController.editShow);

module.exports = router;
