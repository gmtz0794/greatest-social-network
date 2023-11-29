const { User } = require('../models');

const userController = {
  getAllUsers(req, res) {
    User.find({})
      .populate('thoughts') 
      .populate('friends') 
      .select('-__v') 
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },


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

  createUser(req, res) {
    const { username, email } = req.body;
    User.create({ username, email })
      .then((user) => res.json(user))
      .catch((err) => res.status(400).json(err));
  },

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

  deleteUser(req, res) {
    const { id } = req.params;
    User.findByIdAndDelete(id)
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: 'User not found' });
          return;
        }
        res.json({ message: 'User deleted successfully' });
      })
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = userController;