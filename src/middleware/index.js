const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../user/model");

exports.hashPass = async (req, res, next) => {
  try {
    // const pass = req.body.password;
    // console.log(pass);
    // const hashedPass = await bcrypt.hash(pass, 8);
    // console.log(hashedPass);
    // req.body.password = hashedPass;
    req.body.password = await bcrypt.hash(req.body.password, 8);
    next();
    //take a password out of the body, hash that password with bcrypt and then put it back in the body
  } catch (error) {
    console.log(error);
    res.send({ err: error });
  }
};

exports.comparePass = async (req, res, next) => {
  try {
    req.user = await User.findOne({ username: req.body.username });
    if (
      req.user &&
      (await bcrypt.compare(req.body.password, req.user.password))
    ) {
      next();
    } else {
      throw new Error({ msg: "Incorrect Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.send({ err: error });
  }
};

exports.tokenCheck = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const decodedToken = await jwt.verify(token, process.env.SECRET);
    const user = await User.findById(decodedToken._id);
    req.user = user;
    next();
    //get the token from req , unlock the token, find the user with the id in the token, send the user to a controller.
  } catch (error) {
    console.log(error);
    res.status(418).send({ err: error });
  }
};
