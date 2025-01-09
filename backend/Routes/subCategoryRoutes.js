const express = require("express");
const subCategoryRouter = express.Router();
const {
  addSubCategory,
  deleteSubCategory,
  updateSubCategory,
  getAllSubCategory,
  getSubCategoryById,
} = require("../controllers/subCategoryController");

subCategoryRouter.post("/subCategory", addSubCategory);

subCategoryRouter.get("/subCategory", getAllSubCategory);

subCategoryRouter.get("/subCategory/:id", getSubCategoryById);

subCategoryRouter.put("/subCategory/:id", updateSubCategory);

subCategoryRouter.delete("/subCategory/:id", deleteSubCategory);

module.exports = subCategoryRouter;
