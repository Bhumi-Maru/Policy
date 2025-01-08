const Client = require("../Models/Client");

// Add a client
const addClient = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      streetAddress,
      state,
      city,
      area,
      zip,
    } = req.body;

    console.log("Received data:", req.body);

    // Validate required fields
    if (!state || !city) {
      return res.status(400).json({
        message: "State and City are required fields.",
      });
    }

    // Validate required files
    if (!req.files || !req.files.aadharCard || !req.files.pan) {
      return res
        .status(400)
        .json({ message: "Aadhar Card and PAN are required." });
    }

    // Log uploaded file details
    console.log(
      "Aadhar Card Original Name:",
      req.files.aadharCard[0]?.originalname
    );
    console.log("PAN Card Original Name:", req.files.pan[0]?.originalname);

    if (req.files.otherDocuments) {
      req.files.otherDocuments.forEach((file, index) => {
        console.log(
          `Other Document ${index + 1} Original Name:`,
          file.originalname
        );
      });
    }

    const otherDocumentsArray =
      Array.isArray(req.files.otherDocuments) &&
      req.files.otherDocuments.length > 0
        ? req.files.otherDocuments.map((file) => `/uploads/${file.filename}`)
        : [];

    // Create a new client
    const newClient = new Client({
      firstName,
      lastName,
      phoneNumber,
      email,
      streetAddress,
      state,
      city,
      area,
      zip,
      aadharCard: `/uploads/${req.files.aadharCard[0].filename}`,
      pan: `/uploads/${req.files.pan[0].filename}`,
      otherDocuments: otherDocumentsArray,
    });

    await newClient.save();
    res.status(200).json({ message: "Client added successfully" });
  } catch (error) {
    console.error("Error adding client:", error);
    res.status(500).json({ message: "Error adding client" });
  }
};

// Fetch all clients
// clientsController.js
const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find({}, "firstName lastName"); // Fetch only required fields
    return res.status(200).json(clients);
  } catch (error) {
    console.error("Error fetching clients:", error);
    return res.status(500).json({ message: "Error fetching clients" });
  }
};

module.exports = { getAllClients };

// Delete client
const deleteClient = async (req, res) => {
  try {
    const { id } = req.params; // Get client ID from the URL params
    const client = await Client.findByIdAndDelete(id); // Find client by ID and delete
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json({ message: "Client deleted successfully", client });
  } catch (error) {
    console.error("Error deleting client:", error);
    res.status(500).json({ message: "Error deleting client" });
  }
};

// Update client
const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (req.files) {
      if (req.files.aadharCard) {
        updates.aadharCard = `/uploads/${req.files.aadharCard[0].filename}`;
      }

      if (req.files.pan) {
        updates.pan = `/uploads/${req.files.pan[0].filename}`;
      }

      if (req.files.otherDocuments) {
        updates.otherDocuments = req.files.otherDocuments.map(
          (file) => `/uploads/${file.filename}`
        );
      }
    }

    const updatedClient = await Client.findByIdAndUpdate(id, updates);

    if (!updatedClient) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.status(200).json({
      message: "Client updated successfully",
      updatedClient,
    });
  } catch (error) {
    console.error("Error while updating client:", error);
    res.status(500).json({
      message: "An error occurred while updating the client.",
      error: error.message,
    });
  }
};

// Fetch a single client by ID
const getClientById = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findById(id);

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.status(200).json(client);
  } catch (error) {
    console.error("Error fetching client by ID:", error);
    res.status(500).json({ message: "Error fetching client" });
  }
};

module.exports = {
  addClient,
  getAllClients,
  deleteClient,
  updateClient,
  getClientById,
};
