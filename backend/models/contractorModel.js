// models/contractorModel.js
const mongoose = require("mongoose");

const contractorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  companyname: { type: String, required: true },
  servicetype: {
    type: String,
    enum: ["Plumbing", "Electrical", "Landscaping"],
    default: "Plumbing",
  },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  companywebsite: { type: String, required: true },
  additionalnote: { type: String, required: true },
});

module.exports = mongoose.model("Contractor", contractorSchema);
