const UserCreation = require("../Models/UserCreation");
// const bcrypt = require("bcrypt");

// Add a new user
const addUser = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, password } = req.body;

    const existingUser = await UserCreation.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists. Please use a different email.",
      });
    }

    // Check for missing fields
    if (!firstName || !lastName || !email || !phoneNumber || !password) {
      return res.status(400).json({
        message:
          "All fields are required: firstName, lastName, email, phoneNumber, password",
      });
    }

    // const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserCreation({
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
    });

    await user.save();
    return res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Error adding user:", error);

    return res.status(500).json({ message: "Error adding user" });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await UserCreation.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const user = await UserCreation.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ message: "Error fetching user by ID" });
  }
};

// Update a user
const updateUser = async (req, res) => {
  try {
    const user = await UserCreation.findByIdAndUpdate(req.params.id, req.body);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user" });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const user = await UserCreation.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Error deleting user" });
  }
};

module.exports = { addUser, getAllUsers, updateUser, deleteUser, getUserById };
