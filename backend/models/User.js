const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  propertyAddress: {
    type: String,
    required: true,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);



// // backend/models/User.js
// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, 'Name is required'],
//     trim: true
//   },
//   propertyAddress: {
//     type: String,
//     required: [true, 'Property address is required']
//   },
//   dateAdded: {
//     type: Date,
//     default: Date.now
//   }
// }, { timestamps: true });

// userSchema.methods.toJSON = function () {
//   const user = this.toObject();
//   user.dateAdded = new Date(user.dateAdded).toLocaleDateString('en-US', {
//     day: 'numeric',
//     month: 'short',
//     year: 'numeric'
//   });
//   return user;
// };

// module.exports = mongoose.models.User || mongoose.model('User', userSchema);
