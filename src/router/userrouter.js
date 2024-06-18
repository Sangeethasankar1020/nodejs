// by express framework
const express = require("express");
const router = express.Router();
const userController = require("../Controller/userController");
// login controller

const loginController = require("../Controller/loginController");

router.route("/register").post(userController.createUserDetails); //for data creation api

// get all user by get method

router.route("/get/all/user").get(userController.getUserAll);
module.exports = router;

// get user by id

router.route("/get/user/:id").get(userController.getSpecificUser);

// delete method

router.route("/delete/:id").delete(userController.deleteUser);
module.exports = router;

// update method

router.route("/update/user/:id").put(userController.updateUserDetails);

// get wishlist user data

router.route("/get/wishlist/product/:id").get(userController.getWishlistData);

// login route - when user login - show order , wishlist

router.route("/login").post(loginController.userLogin);
module.exports = router