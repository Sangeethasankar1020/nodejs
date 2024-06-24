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
// add one field in all product using update many
const updateField = async (req, res) => {
   const { filter, update } = req.body;
  const results= await productServices.updateFieldInAllProducts(filter,update);
  res.send(results)
}
// sort a product by price range
const getProductsByPriceRange=async(req,res)=>{
   const {minPrice,maxPrice}=req.query
   const products=await productServices.getProductsByPriceRange(Number(minPrice), Number(maxPrice))
   res.send(products)
}



module.exports = {
  createProductData,
  getAllProducts,
  getProducts,
  getProductsPrice,
  updateField,
  getProductsByPriceRange
};
