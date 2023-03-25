const express = require("express");
const router = express.Router();
const courseController = require("../Controller/TreatmentCourse");
const StaticData = require("../utils/StaticData");

router.route("/").get(courseController.getAllCourses);

module.exports = router;
