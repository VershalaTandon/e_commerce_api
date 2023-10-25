const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required"] },
  email: { type: String, unique: true, required: [true, "Email is required"] },
  mobileNumber: Number,
  password: { type: String, required: [true, "Password is required"] },
  token: { type: String },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
