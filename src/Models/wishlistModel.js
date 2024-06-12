const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const wishlistSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4,
  },
  productId: {
    type: String,
  },
  userId: {
    type: String,
  },
  orderStatus: {
    type: Boolean,
    default: false,
  },
});

const wishlistModel = mongoose.model("wishlist", wishlistSchema);
module.exports = wishlistModel;