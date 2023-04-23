const express = require("express");
const router = express.Router();
const postController = require("../Controller/post");
const StaticData = require("../utils/StaticData.js");
const authController = require("../Controller/auth");

router
  .route("/")
  .get(postController.getAllPosts)
  .post(
    // authController.protect,
    // authController.restrictTo(StaticData.AUTH.Role.admin,StaticData.AUTH.Role.Doctor),
    postController.createPost);

router.route("/storePost").get(
  // authController.protect,
  // authController.restrictTo(StaticData.AUTH.Role.admin,StaticData.AUTH.Role.Doctor),
  postController.storePost);

router.route("/create").get(
  // authController.protect,
  // authController.restrictTo(StaticData.AUTH.Role.admin,StaticData.AUTH.Role.Doctor),
  postController.creatShow);

router
  .route("/:id")
  .patch(
    // authController.protect,
    // authController.restrictTo(StaticData.AUTH.Role.admin,StaticData.AUTH.Role.Doctor),
    postController.updatepost)
  .delete(
    // authController.protect,
    // authController.restrictTo(StaticData.AUTH.Role.admin,StaticData.AUTH.Role.Doctor),
    postController.deletePost)
  .get(postController.getPost);

router.route("/:id/edit").get(
  // authController.protect,
  // authController.restrictTo(StaticData.AUTH.Role.admin,StaticData.AUTH.Role.Doctor),
  postController.editShow);

module.exports = router;
