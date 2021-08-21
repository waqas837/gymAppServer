const mongoose = require("mongoose");
const courseSchema = mongoose.Schema({
  trainer: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: "User" } }],
  address: String,
  charges: String,
  contact: String,
  coursetitle: String,
  description: String,
  endtime: String,
  starttime: String,
  gyname: String,
  lecturelink: String,
  location: { lng: "", lat: "" },
  maxstudents: String,
});
module.exports = mongoose.model("Course", courseSchema);
