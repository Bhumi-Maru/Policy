const mongoose = require("mongoose");

const policySchema = new mongoose.Schema({
  clientName: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
  companyName: { type: String, required: true },
  mainCategory: { type: String, required: true },
  subCategory: { type: String, required: true },
  issueDate: { type: String, required: true },
  expiryDate: { type: String, required: true },
  policyAmount: { type: String, required: true },
  policyAttachment: { type: String, required: true },
});

const Policy = mongoose.model("Policy", policySchema);

module.exports = Policy;
