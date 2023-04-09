const express = require("express");
const router = express.Router();
const DisController = require("../Controller/Disease");
const StaticData = require("../utils/StaticData.js");
const authController = require("../Controller/auth");

router
  .route("/")
  .post(
    authController.protect,
    authController.restrictTo(
      StaticData.AUTH.Role.admin,
      StaticData.AUTH.Role.admin
    ),
    DisController.addDis
  );

router.route("/:slug").get(DisController.GetDisbyName);

router
  .route("/:id")
  .delete(
    authController.protect,
    authController.restrictTo(
      StaticData.AUTH.Role.admin,
      StaticData.AUTH.Role.admin
    ),
    DisController.deleteDis
  )
  .patch(
    authController.protect,
    authController.restrictTo(
      StaticData.AUTH.Role.admin,
      StaticData.AUTH.Role.admin
    ),
    DisController.updateCourse
  );

module.exports = router;
