const Company = require("../Models/Company");

// Add a new company
const addCompany = async (req, res) => {
  try {
    const { companyName } = req.body;

    if (!companyName) {
      return res.status(400).json({ message: "Company name is required" });
    }

    const company = await Company.create({ companyName });
    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ message: "Error adding company", error });
  }
};

// Delete a company by ID
const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;

    const company = await Company.findByIdAndDelete(id);

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.status(200).json({ message: "Company deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting company", error });
  }
};

// Update a company by ID
const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const { companyName } = req.body;

    if (!companyName) {
      return res.status(400).json({ message: "Company name is required" });
    }

    const company = await Company.findByIdAndUpdate(
      id,
      { companyName },
      { new: true }
    );

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ message: "Error updating company", error });
  }
};

// Get all company names
const getAllCompanyNames = async (req, res) => {
  try {
    const companies = await Company.find({}, "companyName");
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching companies", error });
  }
};

// Get company name by ID
const getCompanyNameById = async (req, res) => {
  try {
    const { id } = req.params;

    const company = await Company.findById(id, "companyName");

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ message: "Error fetching company", error });
  }
};

module.exports = {
  addCompany,
  deleteCompany,
  updateCompany,
  getAllCompanyNames,
  getCompanyNameById,
};
