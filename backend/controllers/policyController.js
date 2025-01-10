const Policy = require("../Models/Policy");

//add policy
const addPolicy = async (req, res) => {
  try {
    const {
      clientName,
      companyName,
      mainCategory,
      subCategory,
      issueDate,
      expiryDate,
      policyAmount,
      policyAttachment,
    } = req.body;

    // let policyAttachment;
    if (req.files && req.files.policyAttachment) {
      policyAttachment = `/uploads/${req.files.policyAttachment[0].filename}`;
    } else {
      return res.status(400).json({ message: "Policy attachment is required" });
    }

    const policy = await Policy.create({
      clientName,
      companyName,
      mainCategory,
      subCategory,
      issueDate,
      expiryDate,
      policyAmount,
      policyAttachment,
    });

    return res
      .status(200)
      .send({ message: "Policy added successfully", policy });
  } catch (error) {
    console.error("Error adding policy:", error);
    return res
      .status(500)
      .json({ message: "Error adding policy", error: error.message });
  }
};

// Fetch all policies
const getAllPolicies = async (req, res) => {
  try {
    const policies = await Policy.find()
      .populate("clientName", "firstName lastName")
      .populate("companyName", "companyName")
      .populate("mainCategory", "mainCategoryName")
      .populate("subCategory", "subCategoryName");

    return res.status(200).json(policies);
  } catch (error) {
    console.error("Error fetching policies:", error);
    return res.status(500).json({ message: "Error fetching policies" });
  }
};

//delete policy
const deletePolicy = async (req, res) => {
  try {
    const { id } = req.params;

    const policy = await Policy.findByIdAndDelete(id);

    if (!policy) {
      return res.status(404).json({ message: "policy not found" });
    }

    return res
      .status(200)
      .json({ message: "policy deleted successfully", policy });
  } catch (error) {
    console.error("Error deleting policy:", error);
    return res.status(500).json({ message: "Error deleting policy" });
  }
};

//update policy
const updatePolicy = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    if (req.files && req.files.policyAttachment) {
      updates.policyAttachment = `/uploads/${req.files.policyAttachment[0].filename}`;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No updates provided" });
    }

    const updatedPolicy = await Policy.findByIdAndUpdate(id, updates);

    if (!updatedPolicy) {
      return res.status(404).json({ message: "Policy not found" });
    }

    return res
      .status(200)
      .json({ message: "Policy updated successfully", updatedPolicy });
  } catch (error) {
    console.error("Error updating policy:", error);
    return res.status(500).json({
      message: "Error updating policy",
      error: error.message,
    });
  }
};

// Fetch a single client by ID
const getPolicyById = async (req, res) => {
  try {
    const { id } = req.params;
    const policy = await Policy.findById(id)
      .populate("clientName", "firstName lastName")
      .populate("companyName", "companyName")
      .populate("mainCategory", "mainCategoryName")
      .populate("subCategory", "subCategoryName");

    if (!policy) {
      return res.status(404).json({ message: "Policy not found" });
    }

    return res.status(200).json(policy);
  } catch (error) {
    console.error("Error fetching Policy by ID:", error);
    return res.status(500).json({ message: "Error fetching Policy" });
  }
};

module.exports = {
  addPolicy,
  getAllPolicies,
  deletePolicy,
  updatePolicy,
  getPolicyById,
};
