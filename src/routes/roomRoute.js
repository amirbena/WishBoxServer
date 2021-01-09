const router = require('express').Router();
const RoomController = require('../controllers/roomController');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');


router.post('/', authentication, authorization, RoomController.createRoom);
router.get('/', RoomController.getAllRooms);
router.get('/available', RoomController.getAvailableRooms);
router.put('/:id', authentication, authorization, RoomController.updateRoomDetails);
router.delete('/:id', authentication, authorization, RoomController.updateRoomDetails);
router.get("/:id", authentication, authorization, RoomController.getRoom);

module.exports = router;