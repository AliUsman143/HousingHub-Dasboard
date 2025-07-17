const mongoose = require("mongoose");

const maintenanceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    maintenanceStatus: {
      type: String,
      enum: ["Pending", "Completed", "In Progress"],
      default: "Pending",
    },
    lastServiceDate: {
      type: Date,
    },
    purchaseDate: {
      type: Date,
    },
    warranty: {
      type: String,
    },
    image: {
      type: String, // filename
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Maintenance", maintenanceSchema);
