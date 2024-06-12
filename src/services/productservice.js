const productModel = require("../Models/productmodel");

// const createProduct = async (body) => {
//   const product = await productModel.create(body);
//   return product;
// };

// module.exports = createProduct;

const createProduct = async (body) => {
  const product = await productModel.create(body);
  return product;
};

module.exports = {
  createProduct,
};

