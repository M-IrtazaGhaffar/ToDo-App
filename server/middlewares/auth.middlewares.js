const jwt = require("jsonwebtoken");
require("dotenv").config();

const authJWT = async (req, res, next) => {
  try {
    // const token = req.headers.authorization;
    const token = req.body.token;
    const isVerified = jwt.verify(token, process.env.SECRET);
    if (token)
      if (isVerified) next();
      else console.log("Unauthorized token!");
    else console.log("Token not found!");
  } catch (error) {
    res.json({
      loggedIn: false,
    });
  }
};

module.exports = authJWT;
