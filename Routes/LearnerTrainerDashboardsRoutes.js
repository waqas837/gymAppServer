const LearnerTrainerDashboardController = require("../Controller/LearnerTrainerDashboardsController");
const router = require("express").Router();
const Auth = require("../Middleware/Auth");
// This file contains only Learner and Trainer api's

// 1.Get instructors only for show to learners
router
  .route("/getInstructors")
  .get(Auth, LearnerTrainerDashboardController.getInstructors);
// 2. Get Instructor details
router
  .route("/getInstructorDetails/:_id")
  .get(Auth, LearnerTrainerDashboardController.getInstructorDetails);
// 3.Save a class to a specific trainer
router
  .route("/saveClassOfInstructor/:_id")
  .post(Auth, LearnerTrainerDashboardController.saveClassOfInstructor);
module.exports = router;
