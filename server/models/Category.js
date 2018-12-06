let mongoose = require("mongoose");

let CategorySchema = new mongoose.Schema({
  name: String,
  slug: String,
  subTasks: String,
  isActive: Boolean
});

let Category = mongoose.model("Category", CategorySchema);
module.exports = Category;
