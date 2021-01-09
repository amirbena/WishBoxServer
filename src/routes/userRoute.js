const router = require('express').Router();
const UserController = require('../controllers/userController');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');


router.post('/signup', UserController.signup);
router.post('/signin', UserController.signin);
router.get('/admin', authentication, authorization, UserController.getAllUsersExceptCurrent);
router.put('/', authentication, authorization, UserController.changeUserAsAdmin);



module.exports = router;