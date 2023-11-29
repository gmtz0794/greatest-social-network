const { User } = require('../models');

const friendController = {
  addFriend(req, res) {
    const { userId } = req.params;
    const { friendId } = req.body;

    if (userId === friendId) {
      res.status(400).json({ message: 'Cannot add yourself as a friend' });
      return;
    }

    User.findByIdAndUpdate(
      userId,
      { $addToSet: { friends: friendId } },
      { new: true }
    )
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: 'User not found' });
          return;
        }
        res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },

  removeFriend(req, res) {
    const { userId } = req.params;
    const { friendId } = req.body;

    User.findByIdAndUpdate(
      userId,
      { $pull: { friends: friendId } },
      { new: true }
    )
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: 'User not found' });
          return;
        }
        res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = friendController;
