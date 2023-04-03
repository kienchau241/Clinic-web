const express = require("express");
const router = express.Router();
const courseController = require("../Controller/TreatmentCourse");
const StaticData = require("../utils/StaticData");

router.param("id", courseController.checkTreatmentCourseById);

router
  .route("/")
  .get(courseController.getAllCourses)
  .post(courseController.createCourse);

router.route("/:id").patch(courseController.updateCourse);

module.exports = router;
