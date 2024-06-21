const productServices = require("../services/productservice")
// const createProductData = async (req, res) => {
//     const product = await productService.createProduct(req.body)
//     res.send(product)
// }

// module.exports = {
//   createProductData,
// };

const createProductData = async (req, res) => {
  const product = await productServices.createProduct(req.body);
  console.log(req.body)
  res.send(product);
};

// get all product with pagnation

const getAllProducts = async (req,res) => {
  const allProducts = await productServices.getAllProducts(req.params.page)
  res.send(allProducts)
}
// sort product by date and time
const getProducts = async (req, res) => {
  const getProducts = await productServices.getSortedProducts(req.body)
  res.send(getProducts);
}
// sort by price

const getProductsPrice = async (req, res) => {
  const getProductsPrice=await productServices.getSortedProductsPrice(req.body)
  res.send(getProductsPrice);
}
module.exports = {
  createProductData,
  getAllProducts,
  getProducts,
  getProductsPrice,
};
