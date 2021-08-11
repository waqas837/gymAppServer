const userController = require("../Controller/UserController");
const UserOperationsController = require("../Controller/UserOperationsController");
const Auth = require("../Middleware/Auth");
const express = require("express");
const router = express.Router();
router.route("/signup").post(userController.signup);
router.route("/login").post(userController.login);
router.route("/adminLogin").post(userController.adminlogin);
router.route("/signupAdmin").post(Auth, userController.signupAdmin);

// make these routes protected
router.route("/findAllUsers").get(Auth, UserOperationsController.FetchAllUsers);
router
  .route("/deleteSingleUser/:_id")
  .delete(Auth, UserOperationsController.DeletSingleUser);

router
  .route("/updateUser/:_id")
  .patch(Auth, UserOperationsController.updateUser);
module.exports = router;
