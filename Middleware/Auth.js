const jwt = require("jsonwebtoken");
const Auth = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  try {
    // authentication for user
    if (token) {
      jwt.verify(token, "thisissecretkey", function (err, decoded) {
        if (err) {
          res.status(403).json({
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
    }
  } catch (error) {
    res.status(401).send("Inavlid token please login!");
  }
};

module.exports = Auth;
