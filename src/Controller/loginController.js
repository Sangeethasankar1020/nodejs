// controller + services

const registerModel = require("../Models/userModel");
const orderModel = require("../Models/orderModel");
const productModel = require("../Models/productmodel");
const wishlistModel = require("../Models/wishlistModel");


const userLogin = async (req, res) => {
  try {
    const { name, password } = req.body;
    const checkData = await registerModel.findOne({
      name: name,
      password: password,
    });
    if (!checkData) {
      return res.status(401).json({ message: "Login failed. Invalid credentials." });
    }

    const userId = checkData._id;

    // if (checkData.length === 0) {
    //   return res
    //     .status(401)
    //     .json({ message: "Login failed. Invalid credentials." });
    // }
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
          as: "wishlistProductDetails",
        },
      },
      {
        $lookup: {
          from: "orders",
          localField: "_id",
          foreignField: "userId",
          as: "orderData",
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
        $addFields: {
          wishlistTotalCount: { $size: "$wishlistProductDetails" },
          wishlistTotalCost: { $sum: "$wishlistProductDetails.price" },
          orderTotalCount: { $size: "$orderProductDetails" },
          orderTotalCost: { $sum: "$orderProductDetails.price" },
        },
      },

      {
        $project: {
          name: 1,
          email: 1,
          wishlistData: 1,
          wishlistProductDetails: 1,
          wishlistTotalCount: 1,
          wishlistTotalCost: 1,
          orderData: 1,
          orderProductDetails: 1,
          orderTotalCount: 1,
          orderTotalCost: 1,
        },
      },
    ]);
    res.status(200).json({ message: "Login successful.", userDetails: getUserDetails });
    // res.send(getUserDetails);
  }

  catch (error) {
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }

};

module.exports = {
  userLogin,
};
