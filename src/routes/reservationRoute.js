const router = require('express').Router();
const ReservationController = require('../controllers/reservationController');
const authentication = require('../middlewares/authentication');



router.post('/', authentication, ReservationController.createReservation);
router.get('/', ReservationController.getAllReservations);
router.get('/user', authentication, ReservationController.getUserReservations);
router.put('/:id', authentication, ReservationController.updateReservation);
router.delete('/:id', authentication, ReservationController.deleteReservation);


module.exports = ReservationController;