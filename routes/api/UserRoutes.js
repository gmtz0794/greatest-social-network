const router = require('express').Router();
const userController = require('../../controllers/UserController');

router.get('/', userController.getAllUsers);

router.get('/:id', userController.getUserById);

router.post('/', userController.createUser);

router.put('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);

router.post('/:userId/friends', userController.addFriend);

router.delete('/:userId/friends', userController.removeFriend);

module.exports = router;