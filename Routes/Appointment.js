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
    AppController.ge
  );
