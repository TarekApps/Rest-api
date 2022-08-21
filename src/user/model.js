const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// userSchema.statics.login = async function(email, password) {
//   const user = await this.findOne({email})

//   if (!user) {
//     throw Error("Incorrect email")
//   }

//     const match = await bcrypt.compare()
// }

const User = mongoose.model("User", userSchema);

module.exports = User;
