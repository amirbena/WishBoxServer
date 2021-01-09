const { UserModel } = require('../models');

const createUser = async ({ fullName, numGuests, email, password, address, country, phone }) => {
    let user = await UserModel.findOne({ email }).exec();
    if (user) return "User with same email exist";
    user = await new UserModel({
        fullName,
        numGuests,
        password,
        address,
        country,
        phone
    }).save();

    return user
}


const login = async (email, password) => {
    const user = await UserModel.findOne({ email }).exec();
    if (!user) return "Email not found";
    if (user.password !== password) return "passwords not match";
    return user;
}

const changeUserStatus = async (adminId, userChangeId) => {
    const admin = await UserModel.findById(adminId).exec();
    if (!admin) return "Admin not exist";
    const user = await UserModel.findById(userChangeId).exec();
    if (!user) return "User not exist";
    user.isAdmin = !user.isAdmin;
    await user.save();
    return "Updated";
}

const getAllUsers = async () => {
    return await UserModel.find({}).exec();
}

const getAllUsersExceptId = async _id => {
    return await UserModel.find({ _id: { $not: { _id } } }).exec();
}

const getUserById = async id => {
    return await UserModel.findById(id).exec();
}

module.exports = {
    createUser,
    login,
    changeUserStatus,
    getAllUsers,
    getAllUsersExceptId,
    getUserById
}