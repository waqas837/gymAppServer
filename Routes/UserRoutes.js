const userController = require("../Controller/UserController");
const UserOperationsController = require("../Controller/UserOperationsByAdmin");
const Auth = require("../Middleware/Auth");
const express = require("express");
const router = express.Router();
// Api's for User Login And SignUp from frontend only
router.route("/signupUser").post(userController.signupUser);
router.route("/userLogin").post(userController.userLogin);

// Following Api's are for the ADMIN ONLY(so we can't share it with anyone)
router.route("/signup").post(userController.signup);
router.route("/login").post(userController.login);
// route for only admin Login but it exists in user controller,
router.route("/adminLogin").post(userController.adminlogin);
//these routes for the admin for take crud actions
router.route("/signupAdmin").post(Auth, UserOperationsController.signupAdmin);

router.route("/findAllUsers").get(Auth, UserOperationsController.FetchAllUsers);
router
  .route("/deleteSingleUser/:_id")
  .delete(Auth, UserOperationsController.DeletSingleUser);

router
  .route("/updateUser/:_id")
  .patch(Auth, UserOperationsController.updateUser);
module.exports = router;
