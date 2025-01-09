const SubCategory = require("../Models/subCategory");

// Add a new main category
const addSubCategory = async (req, res) => {
  try {
    const { subCategoryName } = req.body;

    if (!subCategoryName) {
      return res.status(400).json({ message: "Sub Category Name is required" });
    }

    const newSubCategory = await SubCategory.create({ subCategoryName });
    res.status(201).json(newSubCategory);
  } catch (error) {
    res.status(500).json({ message: "Error adding sub category", error });
  }
};

// Delete a main category by ID
const deleteSubCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSubCategory = await SubCategory.findByIdAndDelete(id);

    if (!deletedSubCategory) {
      return res.status(404).json({ message: "Sub Category not found" });
    }

    res.status(200).json({ message: "Sub Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting sub category", error });
  }
};

// Update a main category by ID
const updateSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { subCategoryName } = req.body;

    if (!subCategoryName) {
      return res.status(400).json({ message: "Sub Category Name is required" });
    }

    const updatedSubCategory = await SubCategory.findByIdAndUpdate(
      id,
      { subCategoryName },
      { new: true }
    );

    if (!updatedSubCategory) {
      return res.status(404).json({ message: "Sub Category not found" });
    }

    res.status(200).json(updatedSubCategory);
  } catch (error) {
    res.status(500).json({ message: "Error updating sub category", error });
  }
};

// Get all main categories
const getAllSubCategory = async (req, res) => {
  try {
    const subCategories = await SubCategory.find({}, "subCategoryName");
    res.status(200).json(subCategories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching sub categories", error });
  }
};

// Get main category by ID
const getSubCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const subCategory = await SubCategory.findById(id, "subCategoryName");

    if (!subCategory) {
      return res.status(404).json({ message: "Sub Category not found" });
    }

    res.status(200).json(subCategory);
  } catch (error) {
    res.status(500).json({ message: "Error fetching sub category", error });
  }
};

module.exports = {
  addSubCategory,
  deleteSubCategory,
  updateSubCategory,
  getAllSubCategory,
  getSubCategoryById,
};
