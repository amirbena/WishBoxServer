const { RoomModel } = require('../models')


const createRoom = async ({ number, guestsCapacity, priceForNight }) => {
    let room = await RoomModel.findOne({ number }).exec();
    if (room) return "Room Number is exist, please change room number";
    room = await new RoomModel({
        number,
        guestsCapacity,
        priceForNight
    }).save();

    return room;
}

const updateRoomDetails = async (_id, newDetails) => {
    return await RoomModel.updateOne({ _id }, newDetails).exec();
}

const getAllRooms = async () => {
    return await RoomModel.find({}).exec();
}

const getRoom = async id => {
    return await RoomModel.findById(id).exec();
}

const deleteRoom= async _id=>{
    return await RoomModel.deleteOne({ _id }).exec();
}

module.exports={
    createRoom,
    updateRoomDetails,
    getAllRooms,
    getRoom,
    deleteRoom,
}