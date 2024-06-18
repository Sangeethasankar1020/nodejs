// controller + services

const registerModel = require("../Models/userModel");
const orderModel = require("../Models/orderModel");
const productModel= require("../Models/productmodel");
const wishlistModel = require("../Models/wishlistModel");


const userLogin = async (req, res) => {
  const { name, password } = req.body;
  const checkData = await registerModel.find({
    name: name,
    password: password,
  });

  const userId = checkData[0];

  if (checkData.length === 0) {
    return res
      .status(401)
      .json({ message: "Login failed. Invalid credentials." });
  }
  const getUserDetails = await registerModel.aggregate([
    {
      $match: {
        _id: userId,
      },
    },
    {
      $lookup: {
        from: "wishlists",
        localField: "_id",
        foreignField: "userId",
        as: "wishlistData",
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "wishlistData.productId",
        foreignField: "_id",
        as: "productData",
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "orderData.productId",
        foreignField: "_id",
        as: "orderProductDetails",
      },
    },
    {
      $project: {},
    },
  ]);
  res.status(200).json({ message: "Login successful.", userDetails });
  res.send(getUserDetails);
};

module.exports = {
  userLogin,
};
