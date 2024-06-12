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
  res.send(product);
};
module.exports = {
  createProductData,
};
