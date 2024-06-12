// const express = require("express");
// const router = express.Router();

const ProductController = require("../Controller/productController");

// router.route("/add/product").post(ProductController.createProductData);

// module.exports = router;
const express = require("express");
const router = express.Router();
// const productController = require("../controller/productController");
router.route("/add/product").post(ProductController.createProductData);

module.exports = router;
