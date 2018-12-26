let mongoose = require("mongoose");

let UserSchema = new mongoose.Schema({
  name: {
    familyName: String,
    givenName: String
  },
  email: String,
  imageUrl: String,
  lastUpdated: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  isRegistered: { type: Boolean, default: true },
  roles: [String] // HR, employee, trainer, admin
});

let User = mongoose.model("User", UserSchema);
module.exports = User;
