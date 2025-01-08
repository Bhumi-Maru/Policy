const mongoose = require("mongoose");

const signupSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
});

const signupModel = mongoose.model("Signup", signupSchema);

module.exports = signupModel;
