const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserSign',
      required: true
    },
    colorTheme: {
      type: String,
      required: true,
    },
    propertyName: {
      type: String,
      required: true,
    },
    propertyImage: {
      type: String,
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
    maintenance: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Maintenance",
        required: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Property", propertySchema);
