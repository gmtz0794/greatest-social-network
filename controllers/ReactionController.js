const { Reaction, Thought, User } = require('../models');

const reactionController = {
  createReaction(req, res) {
    const { thoughtId } = req.params;
    const { reactionBody, username } = req.body;

    Reaction.create({ reactionBody, username })
      .then((newReaction) => {
        return Thought.findOneAndUpdate(
          { _id: thoughtId },
          { $addToSet: { reactions: newReaction._id } },
          { new: true }
        );
      })
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: 'Thought not found' });
          return;
        }
        res.json(thought);
      })
      .catch((err) => res.status(400).json(err));
  },

  deleteReaction(req, res) {
    const { thoughtId, reactionId } = req.params;

    Reaction.findByIdAndDelete(reactionId)
      .then((deletedReaction) => {
        if (!deletedReaction) {
          res.status(404).json({ message: 'Reaction not found' });
          return;
        }
        return Thought.findOneAndUpdate(
          { _id: thoughtId },
          { $pull: { reactions: reactionId } },
          { new: true }
        );
      })
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: 'Thought not found' });
          return;
        }
        res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = reactionController;
