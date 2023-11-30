const router = require('express').Router();

const userRoutes = require('./user-Routes');
const thoughtRoutes = require('./thought-Routes');
const reactionRoutes = require('./reaction-Routes');
const friendRoutes = require('./friend-Routes');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);
router.use('/reactions', reactionRoutes);
router.use('/friends', friendRoutes);

module.exports = router;