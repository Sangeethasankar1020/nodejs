// schema creation - user information

const mongoose = require("mongoose");

// for unique id - convert object id - import

const { v4: uuidv4 } = require("uuid");

// to save password in hash values

const bcrypt=require("bcryptjs")

const registerSchema = new mongoose.Schema({
  // we have to write logic to convert also

  _id: {
    type: String,
    default: uuidv4,
  },
  name: {
    type: String,
    required:true,
  },
  password: {
    type: String,
    required:true,
  },
  mobileNo: {
    type: Number,
  },
  email: {
    type: String,
    required:true,
  },
  age: {
    type: Number,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

// to save password in hash value

registerSchema.pre("save", async function (next) {
  
    if (!this.isModified("password")) {
      return next();
    }
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } 
);

const registerModel = mongoose.model("register", registerSchema);
module.exports = registerModel;
