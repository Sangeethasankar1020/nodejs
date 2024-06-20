const productModel = require("../Models/productmodel");

// const createProduct = async (body) => {
//   const product = await productModel.create(body);
//   return product;
// };

// module.exports = createProduct;

const createProduct = async (body) => {

  // without moment create a data with date fn
  const createdDate = new Date()
  const productData = {
    ...body,
    createdDate: createdDate,
  };
  // include that date with already date - with spread operator 
console.log(productData)
  const product = await productModel.create(productData);
  return product;
};

// get all product with pagnation
const getAllProducts = async (page) => {
  const allProducts = await productModel.aggregate([
    { $skip: page * 5 },
    {$limit:5}
  ])
  return allProducts
}


module.exports = {
  createProduct,
  getAllProducts,
};

