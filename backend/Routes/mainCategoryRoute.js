const express = require("express");
const mainCategoryRouter = express.Router();
const {
  addMainCategory,
  deleteMainCategory,
  updateMainCategory,
  getAllMainCategory,
  getMainCategoryById,
} = require("../controllers/mainCategryController");

mainCategoryRouter.post("/mainCategory", addMainCategory);

mainCategoryRouter.get("/mainCategory", getAllMainCategory);

mainCategoryRouter.get("/mainCategory/:id", getMainCategoryById);

mainCategoryRouter.put("/mainCategory/:id", updateMainCategory);

mainCategoryRouter.delete("/mainCategory/:id", deleteMainCategory);

module.exports = mainCategoryRouter;
