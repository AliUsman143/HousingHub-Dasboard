// backend/models/usersign.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // For password hashing

const userSignSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "is invalid"], // Basic email validation
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/^\d{10,15}$/, "is invalid"], // Basic phone number validation (10-15 digits)
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    // You might add roles here, e.g., 'homeowner', 'admin', 'contractor'
    role: {
      type: String,
      enum: ["user", "admin"], // Example roles
      default: "user",
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Pre-save hook to hash password before saving
userSignSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare entered password with hashed password in DB
userSignSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const UserSign = mongoose.model("UserSign", userSignSchema);

module.exports = UserSign;