// by express framework
const express = require("express");
const router = express.Router();
const userController = require("../Controller/userController");

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

router.route("/update/user/:id").put(userController.updateUserDetails)

// get widhlist user data

router.route("/get/wishlist/product/:id").get(userController.getWishlistData)

