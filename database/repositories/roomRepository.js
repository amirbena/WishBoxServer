const { RoomModel, ReservationModel } = require('../models')


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

const getAvailableRooms = async (numGuests, startDate, endDate) => {
    const reservations = await ReservationModel.find({ startDate, endDate }).exec();
    let rooms = await RoomModel.find({ guestsCapacity: { $gte: numGuests } }).exec();
    if(!reservations.length) return rooms;
    rooms = rooms.filter(room => reservations.find(reseveration => reseveration.room === room._id));
    return rooms;
}

const getAllRooms = async () => {
    return await RoomModel.find({}).exec();
}

const getRoom = async id => {
    return await RoomModel.findById(id).exec();
}

const deleteRoom = async _id => {
    return await RoomModel.deleteOne({ _id }).exec();
}

module.exports = {
    createRoom,
    updateRoomDetails,
    getAllRooms,
    getRoom,
    deleteRoom,
    getAvailableRooms
}