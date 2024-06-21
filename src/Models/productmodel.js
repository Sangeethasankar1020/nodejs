// const mongoose = require("mongoose")
// const { v4: uuidv4 } = require("uuid");

// const ProductSchema = new mongoose.Schema({

//     _id: {
//     type: String,
//     default: uuidv4,
//   },
//   productName: {
//     type: String,
//   },
//   price: {
//     type: Number,
//   },
//   active: {
//     type: Boolean,
//     default: true,
//   },
//   qty: {
//     type: Number,
//   }
// })

// const productModel = mongoose.model("product", ProductSchema)

// module.exports = productModel;

// const moment = require("moment");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const productSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4,
  },
  productName: {
    type: String,
  },
  price: {
    type: Number,
  },
  active: {
    type: Boolean,
    default: true,
  },
  qty: {
    type: Number,
  },
  // // using moment create product with date
  // createdDate: {
  //   type: String,
  //   default:moment().todate()
  // }
  
  // using date fn
   createdDate: {
    type: Date,
     default: Date.now
  }
});

const productModel = mongoose.model("product", productSchema);
module.exports = productModel;
