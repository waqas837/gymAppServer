const mongoose = require("mongoose");
const validator = require("validator");
const userSignup = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true,
    validate: {
      validator: validator.isEmail,
      message: "{VALUE} is not a valid email",
    },
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
  },
});
module.exports = mongoose.model("User", userSignup);
