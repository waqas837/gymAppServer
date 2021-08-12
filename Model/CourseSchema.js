const mongoose = require("mongoose");
const courseSchema = mongoose.Schema({
  coursename: String,
  instructorname: String,
  link: String,
  instructorimage: String,
  coursedesc: String,
  instructordesc: String,
});
module.exports = mongoose.model("Course", courseSchema);
