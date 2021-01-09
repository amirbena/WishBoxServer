const { StatusCodes } = require('http-status-codes');
const { ReservationRepository } = require('../../database');
const { enumCreateResults } = ReservationRepository;
const handleCatch = require('../others/handleCatch');



const createReservation = async (req, res) => {
    const { id: user } = req.user;
    const reservationBody = { user, ...req.body };
    try {
        const reservation = await ReservationRepository.createReservation(reservationBody);
        if (reservation === enumCreateResults["1"] || reservation === enumCreateResults["2"]) return res.status(StatusCodes.NOT_FOUND).send(result);
        if (reservation === enumCreateResults["3"]) return res.status(StatusCodes.CONFLICT).send(result);

        const message = "Reservation added successfully";
        res.json({ message, reservation });
    } catch (ex) {
        handleCatch(res, ex);
    }
}


const getAllReservations = async (req, res) => {
    try {
        const reservations = await ReservationRepository.getAllReservations();
        return res.json({ reservations });
    } catch (ex) {
        handleCatch(res, ex);
    }
}

const getUserReservations = async (req, res) => {
    const { id } = req.user;
    try {
        const reservations = await ReservationRepository.getUserReservations(id);
        return res.json({ reservations });
    } catch (error) {
        handleCatch(res, ex);
    }
}


const updateReservation = async (req, res) => {
    const { id } = req.params;
    try {
        const reservation = await ReservationRepository.updateReservation(id, req.body);
        if (reservation === enumCreateResults["1"]) return res.status(StatusCodes.NOT_FOUND).send(result);
        const message = "Reservation is updated";
        return res.json({ message, reservation });
    } catch (error) {
        handleCatch(res, ex);
    }
}

const deleteReservation = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await ReservationRepository.deleteReservation(id);
        if (!result) return res.status(StatusCodes.NOT_FOUND).send("Reservation not found");
        return res.send("Reservation is deleted successfully");
    } catch (error) {
        handleCatch(res, ex);
    }
}


module.exports={
    createReservation,
    getAllReservations,
    getUserReservations,
    updateReservation,
    deleteReservation
}