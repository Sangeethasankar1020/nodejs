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


module.exports = {
  createProductData,
  getAllProducts,
};
