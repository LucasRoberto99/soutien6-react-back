const mongoose = require("mongoose");

const User = mongoose.model("User", {
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  description: String,
  hash: String,
  salt: String,
  token: String,
});

module.exports = User;
