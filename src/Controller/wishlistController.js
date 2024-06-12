const wishlistService = require("../services/wishlistServices");

const addWishlist = async (req, res) => {
  const wishlistData = await wishlistService.addWishlist(req.body);
  res.send(wishlistData);
};

module.exports = {
  addWishlist,
};