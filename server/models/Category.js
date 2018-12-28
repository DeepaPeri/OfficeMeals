let mongoose = require("mongoose");
let CategorySchema = new mongoose.Schema({
  name: String,
  isActive: Boolean
});

let Category = mongoose.model("Category", CategorySchema);
module.exports = {
  Category: Category
};