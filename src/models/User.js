const mongoose = require("mongoose");

User = mongoose.model("User", {
  username: String,
  password: String,
  user_tasks: [String],
});

module.exports = User;
