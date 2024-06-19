const registerModel = require("../Models/userModel");
const userMode1 = require("../Models/userModel")
// create data

const createUserDetails = async (body) => {
    const createDate = await userMode1.create(body)
    return createDate;
}
// get all user  data

const getUsers = async () => {
    const userDetails = await userMode1.find({})
    return userDetails
}

// get specific user data by id

const getSpecificUser = async (id) => {
  // const userDetails = await userMode1.findById({ _id: id }); // get specific user data by id
  // return userDetails; //get specific user data by id


  // aggregate method to find specific using match
  
  const userDetails = await userMode1.aggregate([
    //match by id

    // {
    //   $match: {
    //     _id:id,
    //   }
    // }

    // by and like compare

    // {
    //   $match: {
    //     $and:[{_id:{$eq:id}},{name:{$eq:"pooja"}}]
    //   }
    // }

    // by or method

    {
      $match: {
        $or:[{_id:{$eq:id}},{name:{$eq:"sharmi"}}]
      }
    }
  
  ])

  return userDetails;

}

// delete method by id 

const deleteUser = async (id) => {
  const deleteUserDetails = await registerModel.findById({ _id: id });
  if (!deleteUserDetails) {
    console.log("user not found");
  } else {
    const deletedata = await registerModel.findByIdAndDelete({ _id: id });
    console.log(deletedata);
  }
  return deleteUserDetails;
};


// update method 

const updateUser=async(id, body)=>{
const checkuserId=await registerModel.findById({_id:id})

if (!checkuserId){
  console.log("user not found")
}

const updateData = await registerModel.findByIdAndUpdate({_id:id},body,{
  new:true
})

return updateData
}
// get wishlist data

const getWishlistData=async(id)=>{
  const wishlistDetails= await registerModel.aggregate([
    {
      $match:{
        _id:id
      },
    },
    {
      $lookup:{
        from:"wishlists",
        localField:"_id",
        foreignField:"userId",
        as:"wishlistData"
      }
    },

    // get wishlist product data - lookup
    {
      $lookup:{
        from:"products",
        localField:"wishlistData.productId",
        foreignField:"_id",
        as:"productData"
      }
    },
    {
      $project:{
        name:1,
        _id: 0,
        mobile:1,
        email:1,
        productData:1
        // product_name: "$productData.productName",
        // product_price:"$productData.price",
        // qty:"$productData.qty"

      }
    }
  ]) 

  return wishlistDetails
}

// get active users 
const getActiveUsers = async () => {
  try {
    const activeUsers = await registerModel.find({ active: true });
    return activeUsers;
  } catch (error) {
    throw error;
  }
};
// get inactive users
const getUsersByActiveStatus = async (isActive) => {
  try {
    const users = await registerModel.find({ active: isActive });
    return users;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  createUserDetails,
  getUsers,
  getSpecificUser,
  deleteUser,
  getWishlistData,
  getActiveUsers,
  getUsersByActiveStatus 
};
