const router = require('express').Router();
const thoughtController = require('../../controllers/thoughtController');

router.get('/', thoughtController.getAllThoughts);

router.get('/:id', thoughtController.getThoughtById);

router.post('/', thoughtController.createThought);

router.put('/:id', thoughtController.updateThought);

router.delete('/:id', thoughtController.deleteThought);

router.post('/:thoughtId/reactions', thoughtController.createReaction);

router.delete('/:thoughtId/reactions/:reactionId', thoughtController.deleteReaction);

module.exports = router;
