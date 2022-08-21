const jwt = require("jsonwebtoken");
const User = require("./model");

exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    const token = await jwt.sign({ _id: newUser._id }, process.env.SECRET);
    //generate token using newUser._id
    res.send({ msg: newUser, token });
  } catch (error) {
    console.log(error);
    res.send({ err: error });
  }
};

exports.readUser = async (req, res) => {
  try {
    const findUsers = await User.find({});
    const result = findUsers.map((u) => {
      return u.username;
    });
    res.send({ allUsers: result });
    console.log(result);
  } catch (error) {
    console.log(error);
    res.send({ err: error });
  }
};

exports.updateUser = async (req, res) => {
  if (req.body.username) {
    try {
      const newUser = await User.updateOne(
        { username: req.body.username },
        { $set: { username: req.body.newUsername } }
      );
      console.log(newUser);
      res.send({ msg: "Successfully updated user" });
    } catch (error) {
      console.log(error);
      res.send({ err: error });
    }
  } else if (req.body.email) {
    try {
      const newUser = await User.updateOne(
        { email: req.body.email },
        { $set: { email: req.body.newEmail } }
      );
      console.log(newUser);
      res.send({ msg: "Successfully updated user" });
    } catch (error) {
      console.log(error);
      res.send({ err: error });
    }
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deleteUser = await User.deleteOne({
      username: req.body.username,
    });
    res.send({ msg: "Successfully deleted user" });
  } catch (error) {
    console.log(error);
    res.send({ err: error });
  }
};

exports.login = async (req, res) => {
  try {
    const token = await jwt.sign({ _id: req.user._id }, process.env.SECRET);
    res.send({ user: req.user.username, token });
  } catch (error) {
    console.log(error);
    res.send({ err: error });
  }
};

// exports.userLogin = async (req, res) => {
//   try {
//     const user = await User.findOne({
//       username: req.body.username,
//       password: req.body.password,
//     });
//   } catch (error) {
//     console.log(error);
//     res.send({ err: error });
//   }
// };
