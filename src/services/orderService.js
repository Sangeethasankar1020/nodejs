const registerModel=require("../Models/userModel")
const orderModel=require("../Models/orderModel")

const createOrderDetails=async (body)=>{
    const createOrder=await orderModel.create(body)
    return createOrder
}

// get  wishlist by id

const getUserOrder=async(id)=>{
    const orderDetails=await registerModel.aggregate([

        {
            $match:{
                _id:id,
            }
        },
        {
            $lookup:{
                from:"orders",
                localField:"_id",
                foreignField:"userId",
                as:"orderdata"
            }
        },
        {
            $project:{
                _id:0,
                name:1,
                rollno:1,
                id:1,
                email:1,
                orderData:1
            }
        }

    ])
    return orderDetails
}

module.exports={
    createOrderDetails,
    getUserOrder

}