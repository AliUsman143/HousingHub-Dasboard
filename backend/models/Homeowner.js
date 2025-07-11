const mongoose = require("mongoose");

const homeownerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  status: {
    type: String,
    enum: ["Active", "Pending", "Expired"],
    default: "Pending",
  },
  dateAdded: { type: String, required: true },
});

module.exports = mongoose.model("Homeowner", homeownerSchema);
