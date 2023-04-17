const express = require("express");
const router = express.Router();
const AppController = require("../Controller/Appointment");
const StaticData = require("../utils/StaticData.js");
const authController = require("../Controller/auth");

router.param("id", AppController.checkAppointmentById);

router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo(
      StaticData.AUTH.Role.Doctor,
      StaticData.AUTH.Role.admin
    ),
    AppController.getAllApp
  )
  .post(AppController.createApp);

router
  .route("/:id")
  .patch(AppController.updateApp)
  .get(AppController.getAppointmentById)
  .delete(AppController.deleteApp);

module.exports = router;
