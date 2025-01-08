const express = require("express");
const agentRouter = express.Router();
const {
  addAgent,
  updateAgent,
  getAllAgents,
  getAgentById,
  deleteAgent,
} = require("../controllers/agentController");
const { uploadFields } = require("../middleware/uploadMiddleware");

// Add a client
agentRouter.post("/agent", uploadFields, addAgent);

// Get all clients
agentRouter.get("/agent", getAllAgents);

// Delete a client
agentRouter.delete("/agent/:id", deleteAgent);

// Update a client
agentRouter.put("/agent/:id", uploadFields, updateAgent);
agentRouter.get("/agent/:id", getAgentById);

module.exports = agentRouter;
