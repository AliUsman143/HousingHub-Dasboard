const mongoose = require("mongoose");

const applianceSchema = new mongoose.Schema({
  applianceName: { type: String, required: true },
  modelNumber: { type: String },
  brand: { type: String },
  applianceType: { type: String, required: true },
  serialNumber: { type: String },
  maintenanceStatus: { type: String },
  image: { type: String }, // image file name or URL

  purchasedFrom: {
    companyName: { type: String },
    contactName: { type: String },
    phoneNo: { type: String },
    email: { type: String },
    warrantyExpires: { type: Date },
    purchaseDate: { type: Date },
    companyWebsite: { type: String },
  },

  installedBy: {
    companyName: { type: String },
    contactName: { type: String },
    phoneNo: { type: String },
    email: { type: String },
    contractor: { type: String }, // from dropdown
    lastServiced: { type: Date },
    installationDate: { type: Date },
    companyWebsite: { type: String },
  },

  purchasedBy: {
    companyName: { type: String },
    contactName: { type: String },
    purchaseDate: { type: Date },
    companyWebsite: { type: String },
    phoneNo: { type: String },
  },

  additionalNotes: { type: String },
}, {
  timestamps: true, // adds createdAt and updatedAt
});

module.exports = mongoose.model("Appliance", applianceSchema);
