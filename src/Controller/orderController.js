const orderService=require("../services/orderService")

// create order
const createOrderDetails=async(req,res)=>{
    const orderDetails =await orderService.createOrderDetails(req.body)
    res.send(orderDetails)
}

// get order by id
const getUserOrder= async(req,res)=>{
    const getOrder=await orderService.getUserOrder(req.params.id)
    res.send(getOrder)
}

module.exports={
    createOrderDetails,
    getUserOrder
}