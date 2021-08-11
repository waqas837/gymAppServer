const courseController = require("../Controller/CourseController");
const router = require("express").Router();
const Auth = require("../Middleware/Auth");
const upload = require("../Middleware/imgUpload");

router.route("/addNewCourse").post(Auth, courseController.addNewCourse);
router.route("/getAllCourseData").get(Auth, courseController.getAllCourseData);
router
  .route("/deleteACourse/:_id")
  .delete(Auth, courseController.deleteAsingleCourse);
router
  .route("/getCategoryLevels/:_id")
  .get(Auth, courseController.getCategoryLevels);

router
  .route("/getLanguages/:_id")
  .get(Auth, courseController.getDefaultLanguages);

router
  .route("/addCourseField/:_id")
  .post(Auth, courseController.addCourseField);
router.route("/addLanguageField/:_id").post(Auth, courseController.addLanguage);

router
  .route("/addFinallyLevelToCourse/:_id/:level")
  .post(Auth, courseController.addFinallyLevelToCourse);

router
  .route("/addFinallyLanguageToCourse/:_id/:lang")
  .post(Auth, courseController.addFinallyLanguageToCourse);

router
  .route("/addInstructorProfile/:_id")
  .post(Auth, upload.single("image"), courseController.addInstructorProfile);

module.exports = router;
