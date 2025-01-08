const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  streetAddress: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  area: { type: String, required: true },
  zip: { type: String, required: true },
  aadharCard: { type: String, required: true },
  pan: { type: String, required: true },
  otherDocuments: { type: [String] },
});

const Agent = mongoose.model("Agent", agentSchema);

module.exports = Agent;
