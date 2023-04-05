const express = require("express");
const userController = require("../Controller/User");
const authController = require("../Controller/auth");

const router = express.Router(); //router is a middleware

router.route("/signup").post(authController.signup);

router.route("/login").post(authController.login);

//using param middleware - param middleware is middleware that run only if certain parameters appears in req url
router.param("id", userController.checkID);

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);
module.exports = router;
