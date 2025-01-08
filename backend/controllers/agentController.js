const Agent = require("../Models/agent");

// Add a client
const addAgent = async (req, res) => {
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
    const newAgent = new Agent({
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

    await newAgent.save();
    res.status(200).json({ message: "User added successfully" });
  } catch (error) {
    console.error("Error adding User:", error);
    res.status(500).json({ message: "Error adding User" });
  }
};

// Fetch all clients
const getAllAgents = async (req, res) => {
  try {
    const agents = await Agent.find();
    res.status(200).json(agents);
  } catch (error) {
    console.error("Error fetching agents:", error);
    res.status(500).json({ message: "Error fetching agents" });
  }
};

// Delete client
const deleteAgent = async (req, res) => {
  try {
    const { id } = req.params;
    const agent = await Agent.findByIdAndDelete(id);
    if (!agent) {
      return res.status(404).json({ message: "Agent not found" });
    }
    res.status(200).json({ message: "Agent deleted successfully", agent });
  } catch (error) {
    console.error("Error deleting agent:", error);
    res.status(500).json({ message: "Error deleting agent" });
  }
};

// Update client
const updateAgent = async (req, res) => {
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

    const updatedAgent = await Agent.findByIdAndUpdate(id, updates);

    if (!updatedAgent) {
      return res.status(404).json({ message: "Agent not found" });
    }

    res.status(200).json({
      message: "Client updated successfully",
      updatedAgent,
    });
  } catch (error) {
    console.error("Error while updating agent:", error);
    res.status(500).json({
      message: "An error occurred while updating the agent.",
      error: error.message,
    });
  }
};

// Fetch a single client by ID
const getAgentById = async (req, res) => {
  try {
    const { id } = req.params;
    const agent = await Agent.findById(id);

    if (!agent) {
      return res.status(404).json({ message: "Agent not found" });
    }

    res.status(200).json(agent);
  } catch (error) {
    console.error("Error fetching agent by ID:", error);
    res.status(500).json({ message: "Error fetching agent" });
  }
};

module.exports = {
  addAgent,
  updateAgent,
  getAllAgents,
  getAgentById,
  deleteAgent,
};
