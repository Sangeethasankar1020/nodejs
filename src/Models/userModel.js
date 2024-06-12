// schema creation - user information

const mongoose = require("mongoose");

// for unique id - convert object id - import

const { v4: uuidv4 } = require("uuid");

const registerSchema = new mongoose.Schema({
  // we have to write logic to convert also

  _id: {
    type: String,
    default: uuidv4,
  },
  name: {
    type: String,
  },
  password: {
    type: String,
  },
  mobileNo: {
    type: Number,
  },
  email: {
    type: String,
  },
  age: {
    type: Number,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

const registerModel = mongoose.model("register", registerSchema);
module.exports = registerModel;
