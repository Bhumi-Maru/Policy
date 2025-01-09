const mongoose = require("mongoose");

const mainCategorySchema = new mongoose.Schema({
  mainCategoryName: { type: String, required: true },
});

const MainCategory = mongoose.model("MainCategory", mainCategorySchema);

module.exports = MainCategory;
