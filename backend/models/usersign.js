// backend/models/usersign.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSignSchema = mongoose.Schema(
  {
    payment: {
      type: Boolean,
      default: false
    },
    subscriptions: [{
      packageId: { type: mongoose.Schema.Types.ObjectId, ref: "Package" },
      stripePriceId: String,
      packageType: String,
      price: Number,
      propertiesIncluded: String,
      stripeSessionId: String,   // NEW – Checkout session id saved by webhook
      purchaseDate: { type: Date, default: Date.now },
      status: { type: String, default: "active" }
    }],
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please enter a valid email"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
      trim: true,
      match: [/^\d{10,15}$/, "Please enter a valid phone number"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    profileImage: String,
  },
  { timestamps: true }
);

// Add pre-save hook for password hashing
userSignSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});
userSignSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create and export the model
const UserSign = mongoose.model("UserSign", userSignSchema);
module.exports = UserSign; // Make sure this export is present