const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user-Controller');


router.get('/', userController.getAllUsers);

router.get('/:id', userController.getUserById);

router.post('/', userController.createUser);

router.put('/:id', userController.updateUser);

router.delete('/:userId', userController.deleteUser);

router.post('/:userId/friends', userController.addFriend);

router.delete('/:userId/friends', userController.removeFriend);

module.exports = router;