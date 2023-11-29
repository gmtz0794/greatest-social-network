const { Thought, User } = require('../models');

const thoughtController = {
  getAllThoughts(req, res) {
    Thought.find()
      .populate('reactions') 
      .select('-__v') 
      .sort({ createdAt: -1 }) 
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  getThoughtById(req, res) {
    const { id } = req.params;
    Thought.findById(id)
      .populate('reactions') 
      .select('-__v') 
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: 'Thought not found' });
          return;
        }
        res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },

  createThought(req, res) {
    const { thoughtText, username } = req.body;
    Thought.create({ thoughtText, username })
      .then((thought) => {
        return User.findOneAndUpdate(
          { username },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) => res.json(user))
      .catch((err) => res.status(400).json(err));
  },

  updateThought(req, res) {
    const { id } = req.params;
    const { thoughtText } = req.body;
    Thought.findByIdAndUpdate(
      id,
      { thoughtText },
      { new: true, runValidators: true }
    )
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: 'Thought not found' });
          return;
        }
        res.json(thought);
      })
      .catch((err) => res.status(400).json(err));
  },

  deleteThought(req, res) {
    const { id } = req.params;
    Thought.findByIdAndDelete(id)
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: 'Thought not found' });
          return;
        }
        return User.findOneAndUpdate(
          { username: thought.username },
          { $pull: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = thoughtController;
