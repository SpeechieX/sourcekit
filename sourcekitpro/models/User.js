const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  avatar: {
    type: String,
  },
  age: {
    type: String,
  },
  location: {
    type: String,
  },
});

module.exports = mongoose.model("User", UserSchema);
