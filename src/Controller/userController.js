const userservice = require("../services/userservice");
// create data
const createUserDetails = async (req, res) => {
  console.log(req.body);
  const userData = await userservice.createUserDetails(req.body);
  res.send(userData);
};


// get all user data
const getUserAll = async (req,res) => {
  const user = await userservice.getUsers()
  res.send(user)
}

// get user by id
const getSpecificUser = async (req, res) => {
  const getUserDetails = await userservice.getSpecificUser(req.params.id)
  res.send(getUserDetails);
  
}

// delete method by id

const deleteUser = async (req, res) => {
  const deleteDetails = await userService.deleteUser(req.params.id);
  res.send(deleteDetails);
};

// update method 

const updateUserDetails= async(req, res)=>{

  const userUpdate= await userservice.updateUser(req.params.id , req.body)
  res.send(userUpdate)

}
// get wishlist data
const getWishlistData= async(req,res)=>{
  const wishlist= await userservice.getWishlistData(req.params.id)
  res.send(wishlist)
}
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
  const isActive = req.params.active === 'true'; // Convert string 'true' to boolean true
  
  try {
    const users = await userservice.getUsersByActiveStatus(isActive);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
  getUsersByActiveStatus
};

