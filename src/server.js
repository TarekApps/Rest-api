require("./db/connection"); //Runs database connection immediately
const express = require("express");
const userRouter = require("./user/routes");
const app = express();

//add relevant routes and controllers to app before listen runs
app.use(express.json()); // tell entire server that it will recieve JSON, and to always send back JSON
app.use(userRouter);

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
