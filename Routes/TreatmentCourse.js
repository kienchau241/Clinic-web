const express = require("express");
const router = express.Router();
const courseController = require("../Controller/TreatmentCourse");
const StaticData = require("../utils/StaticData");
const authController = require("../Controller/auth");

router.param("id", courseController.checkTreatmentCourseById);

router
  .route("/")
  .get(
    // authController.protect,
    // authController.restrictTo(
    //   StaticData.AUTH.Role.admin,
    //   StaticData.AUTH.Role.Doctor
    // ),
    courseController.getAllCourses
  )
  .post(courseController.createCourse);

router.route("/create").get(courseController.createShow);

router.route("/storeCourse").get(courseController.StoreCourseShow);

router
  .route("/:id")
  .patch(courseController.updateCourse)
  .get(courseController.getCoursebyID)
  .delete(courseController.deleteCourse);
// router.route("/:name").get(courseController.getCoursebyName);

router.route("/:id/edit").get(courseController.editShow);

module.exports = router;
