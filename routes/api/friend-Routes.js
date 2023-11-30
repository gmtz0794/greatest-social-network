const router = require('express').Router();
const friendController = require('../../controllers/friendController');

router.post('/:userId', friendController.addFriend);

router.delete('/:userId', friendController.removeFriend);

module.exports = router;
