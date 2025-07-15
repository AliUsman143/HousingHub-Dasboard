const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  colorTheme: {
    type: String,
    required: true,
  },
  propertyName: {
    type: String,
    required: true,
  },
  propertyImage: {
    type: String, // just the filename stored
    required: false,
  },
  address: {
    type: String,
    required: true,
  },
  purchaseDate: {
    type: Date,
    required: true,
  },
  purchasePrice: {
    type: Number,
    required: true,
  },
  yearBuilt: {
    type: Number,
    required: true,
  },
  interestRate: {
    type: Number,
    required: false,
  },
  sizeSqft: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true // adds createdAt and updatedAt
});

module.exports = mongoose.model("Property", propertySchema);
