const jwt = require("jsonwebtoken");
const Auth = (req, res, next) => {
  const { user } = req.cookies;
  const { admin } = req.cookies;
  //  console.log(user);
  try {
    // authentication for user
    if (user) {
      jwt.verify(user, "thisissecretkey", function (err, decoded) {
        if (err) {
          res.status(500).json({
            error: new Error("Invalid token please login"),
          });
        }
        //so if and only user is authenticated then our user will move to the route otherwise not
        if (decoded) {
          req.decoded = decoded;
          next();
        }
      });
      // authentication for admin
    } else if (admin) {
      jwt.verify(admin, "thisissecretkey", function (err, decoded) {
        if (err) {
          res.status(500).json({
            error: new Error("Invalid token please login"),
          });
        }
        //so if and only user is authenticated then our user will move to the route otherwise not
        if (decoded) {
          req.decoded = decoded;
          next();
        }
      });
    }
  } catch (error) {
    res.status(401).send("Inavlid token please login!");
  }
};

module.exports = Auth;
