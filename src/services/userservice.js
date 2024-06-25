const registerModel = require("../Models/userModel");
const userMode1 = require("../Models/userModel")
// send mail by nodemailer
const nodemailer=require("nodemailer")

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
// get user details by login using unwind

// const loginUser = async () => {
//   const user = await registerModel.findOne({ email, password })
//   if (!user) {
//     throw new Error("Invalid email or password");
//   }
//   return user;
// };

// node mailer
// generate a random 6 digit code
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
// function to  verify email
const sendVerificationEmail = async (email, code) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.example.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "sangeethaproject01@gmail.com", // Your email
      pass: "yipl yqzv rzfv hpuh", // Your password
    },
  });
  // Send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Your App" <sangeetha11042001@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Email Verification Code", // Subject line
    text: `Your verification code is ${code}`, // plain text body
    // html: `<b>Your verification code is ${code}</b>`, // html body
  });

  console.log("Message sent: %s", info.messageId);


}

const registerUser=async()=>{
  const verificationCode = generateVerificationCode();
   // Create new user instance
   const newUser = new registerModel({
    name: userData.name,
    password: userData.password,
    mobileNo: userData.mobileNo,
    email: userData.email,
    age: userData.age,
    verificationCode: verificationCode,
  });

  // Save user to database
  await newUser.save();

  // Send verification email
  await sendVerificationEmail(newUser.email, verificationCode);

  return { message: "User registered successfully. Please check your email for verification." };

}


module.exports = {
  createUserDetails,
  getUsers,
  getSpecificUser,
  deleteUser,
  getWishlistData,
  getActiveUsers,
  getUsersByActiveStatus,
  registerUser

};
