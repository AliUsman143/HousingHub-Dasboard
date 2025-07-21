const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  packageType: {
    type: String,
    required: true,
    enum: ['Basic', 'Standard', 'Premium'],
    unique: true
  },
  tagline: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  propertyCount: {
    type: String,
    required: true,
    enum: ['5', '20', '100', 'unlimited']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Package', packageSchema);