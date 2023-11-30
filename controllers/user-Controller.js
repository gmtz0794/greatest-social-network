const { User } = require('../models');

const userController = {
  // Get all users with populated thoughts and friends
  getAllUsers(req, res) {
    User.find({})
      .populate('thoughts')
      .populate('friends')
      .select('-__v')
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  // Get a user by ID with populated thoughts and friends
  getUserById(req, res) {
    const { id } = req.params;
    User.findById(id)
      .populate('thoughts')
      .populate('friends')
      .select('-__v')
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: 'User not found' });
          return;
        }
        res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },

  // Create a new user
  createUser(req, res) {
    const { username, email } = req.body;
    User.create({ username, email })
      .then((user) => res.json(user))
      .catch((err) => res.status(400).json(err));
  },

  // Update a user by ID
  updateUser(req, res) {
    const { id } = req.params;
    const { username, email } = req.body;
    User.findByIdAndUpdate(
      id,
      { username, email },
      { new: true, runValidators: true }
    )
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: 'User not found' });
          return;
        }
        res.json(user);
      })
      .catch((err) => res.status(400).json(err));
  },

  // Delete a user by ID
  deleteUser(req, res) {
    const { userId } = req.params;

    User.findByIdAndDelete(userId)
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: 'User not found' });
          return;
        }
        res.json({ message: 'User deleted successfully' });
      })
      .catch((err) => res.status(500).json(err));
  },

  // Add a friend to a user's friend list
  addFriend(req, res) {
    const { userId } = req.params;
    const { friendId } = req.body;

    User.findByIdAndUpdate(
      userId,
      { $addToSet: { friends: friendId } }, // Use $addToSet to add the friendId to the friends array, avoiding duplicates
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

module.exports = userController;
