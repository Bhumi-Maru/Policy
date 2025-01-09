const mongoose = require("mongoose");
const dotenv = require("dotenv");
//hello

dotenv.config();

const Mongo_URL = process.env.MONGO_URL;

mongoose.connect(Mongo_URL);

const db = mongoose.connection;

module.exports = db;
