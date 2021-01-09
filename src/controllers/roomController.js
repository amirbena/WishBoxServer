const { StatusCodes } = require('http-status-codes');
const { RoomRepository } = require('../../database')
const handleCatch = require('../others/handleCatch');


const createRoom = async (req, res) => {
    try {
        const room = await RoomRepository.createRoom(req.body);
        if (room === "Room Number is exist, please change room number") return res.status(StatusCodes.CONFLICT).send(room);
        return res.json({ room });
    } catch (ex) {
        handleCatch(res, ex);
    }
}

const getAllRooms = async (req, res) => {
    try {
        const rooms = await RoomRepository.getAllRooms();
        return res.json({ rooms });
    } catch (ex) {
        handleCatch(res, ex);
    }
}


const getAvailableRooms = async (req, res) => {
    const { numGuests } = req.user;
    const { startDate, endDate } = req.body;
    try {
        const rooms = await RoomRepository.getAvailableRooms(numGuests, startDate, endDate);
        return res.json({ rooms });
    } catch (ex) {
        handleCatch(res, ex);
    }
}


const getRoom = async (req, res) => {
    const id = req.params;
    try {
        const room = await RoomRepository.getRoom(id);
        if (!room) return res.status(StatusCodes.NOT_FOUND).send("Room not found");
        res.json({ room });
    } catch (ex) {
        handleCatch(res, ex);
    }
}

const deleteRoom = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await RoomRepository.deleteRoom(id);
        if (!result) return res.status(StatusCodes.NOT_FOUND).send("Room not found");
        res.send("Succeed to delete");
    } catch (ex) {
        handleCatch(res, ex);
    }
}

const updateRoomDetails = async (req, res) => {
    const { id } = req.params;
    const roomDetails = req.body;
    try {
        const result = await RoomRepository.updateRoomDetails(id, roomDetails);
        if (!result[0]) res.status(StatusCodes.NOT_FOUND).send("Room not found");
        res.send("Room details is updated")
    } catch (ex) {
        handleCatch(res, ex);
    }
}

module.exports={
    createRoom,
    getAllRooms,
    getAvailableRooms,
    getRoom,
    deleteRoom,
    updateRoomDetails
}