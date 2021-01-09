const { ReservationModel, RoomModel, UserModel } = require('../models');
const RoomRepository = require('./roomRepository');

const getAllReservations = async () => {
    const reservations = await ReservationModel.find({}).populate("room", "number").populate("user", "fullName");
    return reservations;
}

const getUserReservations = async user => {
    const reservations = await ReservationModel.find({ user }).populate("room", "number").populate("user", "fullName");
    return reservations;
}

const enumCreateResults = {
    "1": "User not found, can't complete reservation",
    "2": "Room not found, can't complete reservation",
    "3": "Room Not available, can't complete reseveration"
}

const createReservation = async ({ user, room, startDate, endDate, totalPrice, extras }) => {
    const foundUser = await UserModel.findById(user).exec();
    if (!foundUser) return enumCreateResults["1"];
    let foundRoom = await RoomModel.findById(room).exec();
    if (!foundRoom) return enumCreateResults["2"];
    const roomsAvailable = await RoomRepository.getAvailableRooms(foundUser.numGuests, startDate, endDate);
    foundRoom = roomsAvailable.findIndex(roomsAvailable => roomsAvailable._id === room);
    if (!foundRoom) return enumCreateResults["3"]

    const reservation = await new ReservationModel({
        user,
        room,
        totalPrice,
        startDate,
        endDate,
        extras
    }).save();

    return reservation.populate("room", "number").populate("user", "fullName").execPopulate();
}

const updateReservation = async (_id, detailsToUpdate) => {
    let reservation = await ReservationModel.findById(_id).exec();
    if (!reservation) return enumCreateResults[1];

    reservation = {
        ...reservation,
        detailsToUpdate
    }
    await reservation.save();
    return reservation.populate("room", "number").populate("user", "fullName").execPopulate();
}

const deleteReservation = async _id => {
    return await ReservationModel.deleteOne({ _id }).exec();
}


module.exports = {
   getAllReservations,
   enumCreateResults,
   updateReservation,
   deleteReservation,
   createReservation,
   getUserReservations
}

