const CourseModel = require("../Model/CourseSchema");
const userModel = require("../Model/SignupSchema");
const asycCatch = require("../Utils/asyncCatch");
const fs = require("fs");
//1.add a new course
exports.addNewCourse = asycCatch(async (req, res) => {
  // console.log(req.body);
  const data = await CourseModel.create(req.body);
  if (data) {
    res.status(200).json({ success: true, courses: data });
  } else {
    res.status(404).json({ message: "Data failed to update language" });
  }
});

//2.let fetch all courses;
exports.getAllCourseData = asycCatch(async (req, res) => {
  const data = await CourseModel.find();
  var newData = data.map((val) => val);
  if (data) {
    res.status(200).json({ success: true, newData });
  } else {
    res.status(404).json({ message: "Data not found" });
  }
});

//3.find courses levels
exports.getCategoryLevels = asycCatch(async (req, res) => {
  const { _id } = req.params;
  const data = await CourseModel.findById({ _id }).select("courselevel");
  if (data) {
    res.status(200).json({ success: true, data });
  } else {
    res.status(404).json({ message: "Data not found" });
  }
});

//3.find courses levels
exports.getDefaultLanguages = asycCatch(async (req, res) => {
  const { _id } = req.params;
  const data = await CourseModel.findById({ _id }).select("language");
  // console.log(data);
  if (data) {
    res.status(200).json({ success: true, data });
  } else {
    res.status(404).json({ message: "Data not found" });
  }
});

//4.delete a coures
exports.deleteAsingleCourse = asycCatch(async (req, res) => {
  const { _id } = req.params;
  // first we find the data to remove profile
  const findImage = await CourseModel.findById({ _id }).select(
    "instructorimage"
  );
  // image path
  const imagePath = findImage.instructorimage;
  // and just unlink this path
  if (imagePath) {
    fs.unlink(imagePath, (err) => {
      console.log(err);
      return;
    });
  }
  const data = await CourseModel.findByIdAndDelete({ _id });
  // console.log(data);
  if (data) {
    res.status(200).json({ success: true, data });
  } else {
    res.status(404).json({ message: "Data not found" });
  }
});

//5.add a new category level
exports.addCourseField = asycCatch(async (req, res) => {
  const { _id } = req.params;
  const data = req.body;
  const value = Object.keys(data);
  const findData = await CourseModel.findByIdAndUpdate(
    { _id },
    { $push: { courselevel: value } },
    { new: true }
  );
  if (findData) {
    res.status(200).json({ success: true, findData });
  } else {
    res.status(404).json({ message: "Data failed to update course field" });
  }
});

//6.add a new language field
exports.addLanguage = asycCatch(async (req, res) => {
  const { _id } = req.params;
  const data = req.body;
  const value = Object.keys(data);
  const findData = await CourseModel.findByIdAndUpdate(
    { _id },
    { $push: { language: value } },
    { new: true }
  );
  if (findData) {
    res.status(200).json({ success: true, findData });
  } else {
    res.status(404).json({ message: "Data failed to update course field" });
  }
});

//6.add finally level to a course
exports.addFinallyLevelToCourse = asycCatch(async (req, res) => {
  const { _id, level } = req.params;
  const findData = await CourseModel.findByIdAndUpdate(
    { _id },
    { level },
    { new: true }
  );
  if (findData) {
    res.status(200).json({ success: true, findData });
  } else {
    res.status(404).json({ message: "Failed to add level in database" });
  }
});

//7.add finally language to a course
exports.addFinallyLanguageToCourse = asycCatch(async (req, res) => {
  const { _id, lang } = req.params;
  // console.log(_id, lang);
  const findData = await CourseModel.findByIdAndUpdate(
    { _id },
    { lang },
    { new: true }
  );
  if (findData) {
    res.status(200).json({ success: true, findData });
  } else {
    res.status(404).json({ message: "Data failed to language in database" });
  }
});

//8.add a profile picture of instructor
exports.addInstructorProfile = asycCatch(async (req, res) => {
  const { _id } = req.params;
  const instructorimage = req.file.path;
  const findData = await CourseModel.findByIdAndUpdate(
    { _id },
    { instructorimage },
    { new: true }
  );
  if (findData) {
    res.status(200).json({ success: true, findData });
  } else {
    res.status(404).json({
      message: "Data failed to upload instructor profile in database",
    });
  }
});

//9.get Instructors/learners from usersSinged by admin
exports.getInstructors = asycCatch(async (req, res) => {
  const findData = await userModel.find({ role: "Trainer" }).select("username");
  if (findData) {
    res.status(200).json({ success: true, findData });
  } else {
    res.status(404).json({
      message: "Data failed to upload instructor profile in database",
    });
  }
});

//10.udpate instructor data without image
exports.updatCourse = asycCatch(async (req, res) => {
  const { _id } = req.params;
  console.log(req.body);
  // const findData = await CourseModel.findByIdAndUpdate({ _id }, req.body);
  // if (findData) {
  //   res.status(200).json({ success: true, findData });
  // } else {
  //   res.status(404).json({
  //     message: "Data failed to upload instructor profile in database",
  //   });
  // }
});
