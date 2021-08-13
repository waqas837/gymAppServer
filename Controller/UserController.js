const signUp = require("../Model/SignupSchema");
const Admin = require("../Model/AdminSchema");
const asyncCatch = require("../Utils/asyncCatch");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const genToken = (id) => {
  const token = jwt.sign({ id }, "thisissecretkey");
  return token;
};
// Admin API'S
// user signup not by admin but on startpage
exports.signup = asyncCatch(async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);
  //if user exists
  const userAlreadyExists = await signUp.findOne({ email });
  if (userAlreadyExists) {
    res.json({
      userExists: "User Already exists",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const userSignedup = await signUp.create({
    username,
    email,
    password: hashedPassword,
  });
  const token = genToken(userSignedup._id);
  // console.log(token);
  if (userSignedup) {
    res.cookie("user", token);
    res.status(201).json({
      message: "Account created Successfuly",
      userDetails: userSignedup,
    });
  } else {
    res.json({ ErrorMessage: "Password and Confirm password must be same" });
  }
});
// user login
exports.adminlogin = asyncCatch(async (req, res) => {
  const { email, password } = req.body;
  const findUser = await Admin.findOne({ email });
  if (!findUser) {
    {
      res.json({ invalidUser: "Invalid email or passowrd" });
    }
  } else if (findUser) {
    const hashedPassword = await bcrypt.compare(password, findUser.password);
    if (!hashedPassword) {
      res.json({ invalidUser: "Invalid email or passowrd" });
    } else if (findUser && hashedPassword) {
      const token = genToken(findUser._id);
      res.cookie("admin", token);
      res
        .status(200)
        .json({ message: "successfully logged in", userDetails: findUser });
    }
  }
});

// admin login
exports.login = asyncCatch(async (req, res) => {
  const { email, password } = req.body;
  const findUser = await signUp.findOne({ email });
  if (findUser) {
    const hashedPassword = await bcrypt.compare(password, findUser.password);
    if (findUser && hashedPassword) {
      const token = genToken(findUser._id);
      res.cookie("user", token);
      res
        .status(200)
        .json({ message: "successfully logged in", userDetails: findUser });
    }
  } else if (!findUser && !hashedPassword) {
    res.json({ invalidUser: "Invalid email or passowrd" });
  }
});



// Following api are for user loginAnd Signup from frontend
// 1.user singup
exports.signupUser = asyncCatch(async (req, res) => {
  const { username, email, password } = req.body;
  // console.log(req.body);
  // if user exists
  const userAlreadyExists = await signUp.findOne({ email });
  if (userAlreadyExists) {
    res.json({
      userExists: "User Already exists",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const userSignedup = await signUp.create({
    username,
    email,
    password: hashedPassword,
  });
  const token = genToken(userSignedup._id);
  // console.log(token);
  if (userSignedup) {
    res.cookie("user", token);
    res.status(201).json({
      message: "Account created Successfuly",
      userDetails: userSignedup,
    });
  } else {
    res.json({ ErrorMessage: "Password and Confirm password must be same" });
  }
});