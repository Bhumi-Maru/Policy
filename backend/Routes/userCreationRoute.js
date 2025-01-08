const express = require("express");
const {
  addUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userCreationController");

const userCreationRouter = express.Router();

// Add a new user
userCreationRouter.post("/users", addUser);

// Get all users
userCreationRouter.get("/users", getAllUsers);

// Get user by ID
userCreationRouter.get("/users/:id", getUserById);

// Update a user
userCreationRouter.put("/users/:id", updateUser);

// Delete a user
userCreationRouter.delete("/users/:id", deleteUser);

module.exports = userCreationRouter;
