const express = require("express");
const router = express.Router();
const ReviewController = require("../Controller/Review");
const StaticData = require("../utils/StaticData.js");
const authController = require("../Controller/auth");

router
  .route("/")
  .get(ReviewController.getAllReviews)
  .post(ReviewController.createReview);

router
  .route("/:id")
  .get(ReviewController.getReview)
  .patch(ReviewController.updateReview)
  .delete(ReviewController.deleteReview);

module.exports = router;
