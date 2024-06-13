const express = require("express");
const router = express.Router();
const ProductController = require("../Controller/productController");
const WishlistController = require("../Controller/wishlistController")

// add product

router.route("/add/product").post(ProductController.createProductData);


// add wishlist

router.route("/add/wishlist").post(WishlistController.addWishlist)

module.exports = router;
