const MainCategory = require("../Models/MainCategory");

// Add a new main category
const addMainCategory = async (req, res) => {
  try {
    const { mainCategoryName } = req.body;

    if (!mainCategoryName) {
      return res
        .status(400)
        .json({ message: "Main Category Name is required" });
    }

    const newMainCategory = await MainCategory.create({ mainCategoryName });
    res.status(201).json(newMainCategory);
  } catch (error) {
    res.status(500).json({ message: "Error adding main category", error });
  }
};

// Delete a main category by ID
const deleteMainCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMainCategory = await MainCategory.findByIdAndDelete(id);

    if (!deletedMainCategory) {
      return res.status(404).json({ message: "Main Category not found" });
    }

    res.status(200).json({ message: "Main Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting main category", error });
  }
};

// Update a main category by ID
const updateMainCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { mainCategoryName } = req.body;

    if (!mainCategoryName) {
      return res
        .status(400)
        .json({ message: "Main Category Name is required" });
    }

    const updatedMainCategory = await MainCategory.findByIdAndUpdate(
      id,
      { mainCategoryName },
      { new: true }
    );

    if (!updatedMainCategory) {
      return res.status(404).json({ message: "Main Category not found" });
    }

    res.status(200).json(updatedMainCategory);
  } catch (error) {
    res.status(500).json({ message: "Error updating main category", error });
  }
};

// Get all main categories
const getAllMainCategory = async (req, res) => {
  try {
    const mainCategories = await MainCategory.find({}, "mainCategoryName");
    res.status(200).json(mainCategories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching main categories", error });
  }
};

// Get main category by ID
const getMainCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const mainCategory = await MainCategory.findById(id, "mainCategoryName");

    if (!mainCategory) {
      return res.status(404).json({ message: "Main Category not found" });
    }

    res.status(200).json(mainCategory);
  } catch (error) {
    res.status(500).json({ message: "Error fetching main category", error });
  }
};

module.exports = {
  addMainCategory,
  deleteMainCategory,
  updateMainCategory,
  getAllMainCategory,
  getMainCategoryById,
};
