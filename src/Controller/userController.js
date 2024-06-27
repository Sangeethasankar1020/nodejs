const userservice = require("../services/userservice");
const registerModel = require("../Models/userModel");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();

// to create a jwt token
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// import token model
const tokenModel = require("../Models/tokenModel");
// import that email

// create data
const createUserDetails = async (req, res) => {
  console.log(req.body);
  const userData = await userservice.createUserDetails(req.body);
  res.send(userData);
};

// get all user data
const getUserAll = async (req, res) => {
  const user = await userservice.getUsers();
  res.send(user);
};

// get user by id
const getSpecificUser = async (req, res) => {
  const getUserDetails = await userservice.getSpecificUser(req.params.id);
  res.send(getUserDetails);
};

// delete method by id

const deleteUser = async (req, res) => {
  const deleteDetails = await userService.deleteUser(req.params.id);
  res.send(deleteDetails);
};

// update method

const updateUserDetails = async (req, res) => {
  const userUpdate = await userservice.updateUser(req.params.id, req.body);
  res.send(userUpdate);
};
// get wishlist data
const getWishlistData = async (req, res) => {
  const wishlist = await userservice.getWishlistData(req.params.id);
  res.send(wishlist);
};
// get active users
const getActiveUsers = async (req, res) => {
  try {
    const activeUsers = await userservice.getActiveUsers();
    res.status(200).json(activeUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// get inactive users
const getUsersByActiveStatus = async (req, res) => {
  const isActive = req.params.active === "true"; // Convert string 'true' to boolean true

  try {
    const users = await userservice.getUsersByActiveStatus(isActive);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// get user details by unwind

const loginUser = async (req, res) => {
  const { name, password } = req.body;
  const checkData = await registerModel.findOne({
    name: name,
    password: password,
  });
  if (!checkData) {
    return res
      .status(401)
      .json({ message: "Login failed. Invalid credentials." });
  }
  // to create a token
  else {
    const payload = {
      userDetails: checkData,
    };
    const sign_key = crypto.randomBytes(32).toString("hex");
    console.log(sign_key, "sign key");
    const token = jwt.sign(payload, sign_key, { expiresIn: "24h" });

    const userId = checkData._id;
    // to save
    const newToken = new tokenModel({
      userId: checkData._id,
      token: token,
    });
    await newToken.save();

    res.status(200).send({
      token: token,
      message: "user login succesfully",
    });
  }
  // const getUserDetails = await registerModel.aggregate([
  //   {
  //     $match: { _id: userId },
  //   },
  //   {
  //     $lookup: {
  //       from: "wishlists",
  //       localField: "_id",
  //       foreignField: "userId",
  //       as: "wishlistData",
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "orders",
  //       localField: "_id",
  //       foreignField: "userId",
  //       as: "orderData",
  //     },
  //   },
  //   {
  //     $unwind: {
  //       path: "$wishlistData",
  //       preserveNullAndEmptyArrays: true,
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "products",
  //       localField: "wishlistData.productId",
  //       foreignField: "_id",
  //       as: "wishlistProductDetails",
  //     },
  //   },
  //   {
  //     $unwind: {
  //       path: "$wishlistProductDetails",
  //       preserveNullAndEmptyArrays: true,
  //     },
  //   },
  //   {
  //     $unwind: {
  //       path: "$orderData",
  //       preserveNullAndEmptyArrays: true,
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "products",
  //       localField: "orderData.productId",
  //       foreignField: "_id",
  //       as: "orderProductDetails",
  //     },
  //   },
  //   {
  //     $unwind: {
  //       path: "$orderProductDetails",
  //       preserveNullAndEmptyArrays: true,
  //     },
  //   },
  //   {
  //     $group: {
  //       _id: "$_id",
  //       name: { $first: "$name" },
  //       email: { $first: "$email" },
  //       wishlistProducts: { $push: "$wishlistProductDetails" },
  //       orders: { $push: "$orderData" },
  //       orderProducts: { $push: "$orderProductDetails" },
  //       wishlistTotalCost: { $sum: "$wishlistProductDetails.price" },
  //       orderTotalCost: { $sum: "$orderProductDetails.price" },
  //     },
  //   },
  //   {
  //     $project: {
  //       _id: 1,
  //       name: 1,
  //       email: 1,
  //       wishlistProducts: 1,
  //       wishlistTotalCount: { $size: "$wishlistProducts" },
  //       wishlistTotalCost: 1,
  //       orders: 1,
  //       orderProducts: 1,
  //       orderTotalCount: { $size: "$orders" },
  //       orderTotalCost: 1,
  //     },
  //   },
  // ]);

  // command this for tokensave

  // const getUserDetails = await registerModel.aggregate([
  //   {
  //     $match: { _id: userId },
  //   },
  //   {
  //     $lookup: {
  //       from: "wishlists",
  //       localField: "_id",
  //       foreignField: "userId",
  //       as: "wishlistData",
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "orders",
  //       localField: "_id",
  //       foreignField: "userId",
  //       as: "orderData",
  //     },
  //   },
  //   {
  //     $unwind: {
  //       path: "$wishlistData",
  //       preserveNullAndEmptyArrays: true,
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "products",
  //       localField: "wishlistData.productId",
  //       foreignField: "_id",
  //       as: "wishlistProductDetails",
  //     },
  //   },
  //   {
  //     $unwind: {
  //       path: "$wishlistProductDetails",
  //       preserveNullAndEmptyArrays: true,
  //     },
  //   },
  //   {
  //     $unwind: {
  //       path: "$orderData",
  //       preserveNullAndEmptyArrays: true,
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "products",
  //       localField: "orderData.productId",
  //       foreignField: "_id",
  //       as: "orderProductDetails",
  //     },
  //   },
  //   {
  //     $unwind: {
  //       path: "$orderProductDetails",
  //       preserveNullAndEmptyArrays: true,
  //     },
  //   },
  //   {
  //     $group: {
  //       _id: "$_id",
  //       name: { $first: "$name" },
  //       email: { $first: "$email" },
  //       wishlistProducts: { $push: "$wishlistProductDetails" },
  //       orders: { $push: "$orderData" },
  //       orderProducts: { $push: "$orderProductDetails" },
  //       wishlistTotalCost: { $sum: "$wishlistProductDetails.price" },
  //       orderTotalCost: { $sum: "$orderProductDetails.price" },
  //     },
  //   },
  //   {
  //     $project: {
  //       _id: 1,
  //       name: 1,
  //       email: 1,
  //       wishlistProducts: 1,
  //       wishlistTotalCount: { $size: "$wishlistProducts" },
  //       wishlistTotalCost: 1,
  //       orders: {
  //         $map: {
  //           input: "$orders",
  //           as: "order",
  //           in: {
  //             _id: "$$order._id",
  //             productId: "$$order.productId",
  //             deliveryStatus: "$$order.deliveryStatus",
  //           },
  //         },
  //       },
  //       orderProducts: {
  //         $map: {
  //           input: "$orderProducts",
  //           as: "product",
  //           in: {
  //             _id: "$$product._id",
  //             productName: "$$product.productName",
  //             price: "$$product.price",
  //             qty: "$$product.qty",
  //           },
  //         },
  //       },
  //       orderTotalCount: { $size: "$orders" },
  //       orderTotalCost: 1,
  //     },
  //   },
  // ]);

  //     res.status(200).json({ message: "Login successful.", userDetails: getUserDetails });
  //   } catch (error) {
  //     res.status(500).json({ message: "Internal server error.", error: error.message });
  // }
};

// get details by token and user id using headers

const getUserByToken = async (req, res) => {
  try {
    const token = req.headers['authorization'];
    const userId = req.headers['user-id'];

    if (!token || !userId) {
      return res.status(400).json({ message: "Token and user ID are required" });
    }

    const foundToken = await tokenModel.findOne({ token, userId });

    if (!foundToken) {
      return res.status(401).json({ message: "Invalid token or user ID" });
    }

    const userDetails = await registerModel.findById(userId);

    if (!userDetails) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ userDetails });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};







// handle registaration requests - node mailer

// function to  verify email
const sendVerificationEmail = async (email, code) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.example.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_ADDRESS, // Your email
      pass: process.env.EMAIL_PASSWORD, // Your password
    },
  });

  // const email = process.env.EMAIL_ADDRESS;
  // const password = process.env.EMAIL_PASSWORD;

  // Send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Your App" <sangeethaproject01@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Email Verification Code", // Subject line
    text: `Your verification code is ${code}`, // plain text body
    // html: `<b>Your verification code is ${code}</b>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
};

const registerUser = async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await userservice.registerUser(userData);
    // send verification mail
    const mailSend = await sendVerificationEmail(
      newUser.email,
      newUser.sendVerificationEmail
    );
    res.send({
      message:
        "user registered successfully.Please check your email for verification. ",
    });
  } catch (error) {
    // res.send({message:"error registering user",error})
    if (error.code === 11000) {
      res.status(400).send({
        message: "Email already exists",
        error: error.message,
      });
    } else {
      res.status(500).send({
        message: "Error registering user",
        error: error.message,
      });
    }

    console.log(error, "error");
  }
};

module.exports = {
  createUserDetails,
  getUserAll,
  getSpecificUser,
  deleteUser,
  updateUserDetails,
  getWishlistData,
  getActiveUsers,
  getUsersByActiveStatus,
  loginUser,
  registerUser,
  sendVerificationEmail,
  getUserByToken,
};
