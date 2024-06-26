const mongoose = require("mongoose");

// for unique id - convert object id - import

const { v4: uuidv4 } = require("uuid");

// to save password in hash values

const registerSchema = new mongoose.Schema({
  // we have to write logic to convert also

  _id: {
    type: String,
    default: uuidv4,
  },
  
  password: {
    type: String,
    required: true,
  },
  
  email: {
    type: String,
    required: true,
    unique: true,
  },
  

  // to verify code - send mail

  verificationCode: {
    type: String,
    default: null,
  },

 
});


// to save password in hash value



const otpModel = mongoose.model("registerauth", registerSchema);
module.exports = otpModel;
