const SignupModel = require("../Model/SignupSchema");
const CourseModel = require("../Model/CourseSchema");
const asyncCatch = require("../Utils/asyncCatch");

// 1.Get instructors only for show to learners
exports.getInstructors = asyncCatch(async (req, res) => {
  const findInstructors = await SignupModel.find({ role: "Trainer" });
  if (findInstructors) {
    res.status(200).json({
      success: true,
      instructors: findInstructors,
    });
  } else res.json({ error: "it seems no data found" });
});

// 2. Get Instructor details
exports.getInstructorDetails = asyncCatch(async (req, res) => {
  const { _id } = req.params;
  const findInstructorDetails = await CourseModel.findOne({
    "trainer.user": _id,
  });
  if (findInstructorDetails) {
    res.status(200).json({
      success: true,
      details: findInstructorDetails,
    });
  } else res.json({ error: "it seems no data found" });
});

// saveClassOfInstructor
exports.saveClassOfInstructor = asyncCatch(async (req, res) => {
  const { _id } = req.params;
  const createClass = await CourseModel.create({
    trainer: { user: _id },
    address: req.body.address,
    charges: req.body.charges,
    contact: req.body.contact,
    coursetitle: req.body.coursetitle,
    description: req.body.description,
    endtime: req.body.endtime,
    starttime: req.body.starttime,
    gyname: req.body.gyname,
    lecturelink: req.body.lecturelink,
    location: { lng: req.body.location.lng, lat: req.body.location.lat },
    maxstudents: req.body.maxstudents,
  });
  if (createClass) {
    res.status(201).json({
      success: true,
      message: "Class has been created successfull",
      data: createClass,
    });
  } else {
    res.status(500).json({
      failed: true,
      message: "Error occured while creating class",
    });
  }
});
