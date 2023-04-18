const express = require("express");
const router = express.Router();
const AppController = require("../Controller/Appointment");
const StaticData = require("../utils/StaticData.js");
const authController = require("../Controller/auth");

router.param("idApp", AppController.checkIDappointment);

router
  .route("/")
  .get(
    // authController.restrictTo(
    //   StaticData.AUTH.Role.Doctor,
    //   StaticData.AUTH.Role.admin
    // ),
    AppController.getAllAppointment
  )
  .post(AppController.createAppointment);

router
  .route("/:id")
  .patch(AppController.updateAppointment)
  .get(AppController.getAppointmentById)
  .delete(AppController.deleteAppointment);

module.exports = router;
