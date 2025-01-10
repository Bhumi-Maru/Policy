const mongoose = require("mongoose");

const policySchema = new mongoose.Schema({
  clientName: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
  companyName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  mainCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MainCategory",
    required: true,
  },
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
    required: true,
  },
  issueDate: { type: String, required: true },
  expiryDate: { type: String, required: true },
  policyAmount: { type: String, required: true },
  policyAttachment: { type: String, required: true },
});

const Policy = mongoose.model("Policy", policySchema);

module.exports = Policy;
