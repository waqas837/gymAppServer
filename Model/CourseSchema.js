const mongoose = require("mongoose");
const courseSchema = mongoose.Schema({
  coursename: String,
  coursecategoryname: String,
  instructorname: String,
  instructorimage: String,
  courselevel: {
    type: Array,
    default: ["Easy", "Intermediate", "Advanced"],
  },
  language: {
    type: Array,
    default: ["English", "Urdu", "Hindi"],
  },
  level: String,
  lang: String,
});
module.exports = mongoose.model("Course", courseSchema);
