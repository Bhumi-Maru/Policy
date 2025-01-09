const express = require("express");
const clientRoutes = express.Router();
const {
  addClient,
  getAllClients,
  deleteClient,
  updateClient,
  getClientById,
} = require("../controllers/clientController");
const { uploadFields } = require("../middleware/uploadMiddleware");

// Add a client
clientRoutes.post("/clients", uploadFields, addClient);

// Get all clients
clientRoutes.get("/clients", getAllClients);

// Delete a client
clientRoutes.delete("/clients/:id", deleteClient);

// Update a client
clientRoutes.put("/clients/:id", uploadFields, updateClient);
clientRoutes.get("/clients/:id", getClientById);

module.exports = clientRoutes;
