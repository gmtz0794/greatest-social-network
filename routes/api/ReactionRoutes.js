const router = require('express').Router();
const reactionController = require('../../controllers/reactionController');

router.post('/:thoughtId', reactionController.createReaction);

router.delete('/:thoughtId/:reactionId', reactionController.deleteReaction);

module.exports = router;