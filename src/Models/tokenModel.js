const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const tokenSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4,
  },
  userId: {
    type: String,
    default: uuidv4,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400, // 24 hours
  },
});

module.exports = mongoose.model("Token", tokenSchema);
