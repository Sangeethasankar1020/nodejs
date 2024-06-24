const express = require("express");
const router = express.Router();
const ProductController = require("../Controller/productController");
const WishlistController = require("../Controller/wishlistController")

// add product

router.route("/add/product").post(ProductController.createProductData);


// add wishlist

router.route("/add/wishlist").post(WishlistController.addWishlist)

// get all product with pagnation
router.route("/getallproduct/:page").get(ProductController.getAllProducts)

// sort product by date and time
router.route("/sort/product/datetime").get(ProductController.getProducts);

//  sort product by price - ascending and decending
router.route("/sort/product/price").get(ProductController.getProductsPrice);

// add one field in all product using update many 
router.route("/update/all/field").put(ProductController.updateField)

module.exports = router;


