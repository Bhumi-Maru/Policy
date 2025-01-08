const express = require("express");
const {
  addPolicy,
  getAllPolicies,
  deletePolicy,
  updatePolicy,
  getPolicyById,
} = require("../controllers/policyController");
const { uploadFields } = require("../middleware/uploadMiddleware");

const policyRouter = express.Router();

policyRouter.post("/policy", uploadFields, addPolicy);
policyRouter.get("/policy", getAllPolicies);
policyRouter.delete("/policy/:id", deletePolicy);
policyRouter.put("/policy/:id", uploadFields, updatePolicy);
policyRouter.get("/policy/:id", getPolicyById);

module.exports = policyRouter;
