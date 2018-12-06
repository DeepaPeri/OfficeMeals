let mongoose = require("mongoose");

let LocationSchema = new mongoose.Schema({
  name: String,
  slug: String,
  isActive: Boolean
});

let Location = mongoose.model("Location", LocationSchema);
module.exports = Location;
