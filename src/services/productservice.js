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

// sort product by date and time
const getSortedProducts = async () => {
  const products = await productModel.aggregate([
     { $sort: { createdDate: -1 } } // Sort by createdDate in descending order
  
  ])
  return products
}
// sort by price

const getSortedProductsPrice = async () => {
  const ProductsPrice = await productModel.aggregate([
    { $sort: { price: -1 } }, // 1 for ascending, -1 for descending
  ]);
  return ProductsPrice;
}

// add one field in all product using update many

const updateFieldInAllProducts = async (field, value) => {
  const update = {}
  update[field] = value
 const results= await productModel.updateMany({},{$set:update})
return results
}

module.exports = {
  createProduct,
  getAllProducts,
  getSortedProducts,
  getSortedProductsPrice,
  updateFieldInAllProducts,
};

