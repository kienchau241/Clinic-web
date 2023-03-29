const express = require("express");
const router = express.Router();
const courseController = require("../Controller/TreatmentCourse");
const StaticData = require("../utils/StaticData");

router.route("/").get(courseController.getAllCourses);
//.post(courseController.)

module.exports = router;
