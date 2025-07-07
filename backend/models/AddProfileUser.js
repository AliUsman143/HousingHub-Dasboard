// backend/models/AddProfileUser.js
const mongoose = require("mongoose");

const AddProfileSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNo: { type: String, required: true },
    password: { type: String, required: true },
    profilePicture: { type: String },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.AddProfileUser ||
  mongoose.model("AddProfileUser", AddProfileSchema);
