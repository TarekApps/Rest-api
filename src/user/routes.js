const { Router } = require("express");
const userRouter = Router();
const { hashPass, comparePass, tokenCheck } = require("../middleware");
const {
  createUser,
  readUser,
  updateUser,
  deleteUser,
  login,
} = require("./controllers");

userRouter.post("/user", hashPass, createUser);
userRouter.post("/login", comparePass, login);
userRouter.patch("/user", updateUser);
userRouter.get("/user", readUser);
userRouter.delete("/user", deleteUser);
userRouter.get("/login", tokenCheck, login);

//generate a token on createUser and login, token should include unique info from the db entry, token should be in response
//have an endpoint that finds a user in the db, using the id from token.
module.exports = userRouter;
