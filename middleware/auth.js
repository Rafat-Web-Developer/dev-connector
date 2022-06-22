const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // get token
  const token = req.header("x-auth-token");

  // check empty token
  if (!token) {
    return res.status(401).json({ msg: "No token" });
  }

  // check token valid or not
  try {
    const decode = jwt.verify(token, config.get("jwtSecrete"));

    req.user = decode.user;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Forbidden Access" });
  }
};
