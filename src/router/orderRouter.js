const express=require('express')
const router=express.Router()

const orderController=require('../Controller/orderController')

// create order api
router.route("/add/order").post(orderController.createOrderDetails)

// get wishlist by userid

router.route("/get/orderlist/byid/:id").get(orderController.getUserOrder)

module.exports=router