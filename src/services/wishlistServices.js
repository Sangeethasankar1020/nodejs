const wishlistModel = require("../Models/wishlistModel");

const addWishlist = async (data) => {
    const createData = await wishlistModel.create(data);
    return createData;
};
module.exports = {
    addWishlist,
};