const express = require("express");
const router = express.Router();
const {
  getAllClients,
  addClient,
  deleteClient,
  updateClient,
  getClientById,
} = require("../controllers/clientController");
const { uploadFields } = require("../middleware/uploadMiddleware");

// Add a client
router.post("/clients", uploadFields, addClient);

// Get all clients
router.get("/clients", getAllClients);

// Delete a client
router.delete("/clients/:id", deleteClient);

// Update a client
router.put("/clients/:id", uploadFields, updateClient);
router.get("/clients/:id", getClientById);

module.exports = router;
