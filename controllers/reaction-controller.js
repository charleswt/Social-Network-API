const { Thought, User } = require('../models');

module.exports = {
    async createReaction(req, res) {
        try {
            const { username } = req.params;
            const validUsername = await User.findOne({ username })

            if(!validUsername){
                return res.status(404).json({ message: "Please enter existing username"})
            }
            
            const thought = await Thought.findById(req.body.thoughtId);

            if (!thought) {
                return res.status(404).json({ message: 'Thought not found!' });
            }

            thought.reactions.push({
                reactionBody: req.body.reactionBody,
                username: username
            });

            await thought.save();

            res.status(201).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteReaction(req, res) {
        try {
            const { thoughtId, reactionId } = req.params;

            console.log({ thoughtId, reactionId })

            const thought = await Thought.findById(thoughtId);
            console.log(thought)
            if (!thought) {
                return res.status(404).json({ message: 'Thought not found!' });
            }

            const reactionIndex = thought.reactions.findIndex(
                reaction => reaction.reactionId.toString() === reactionId);
            if (reactionIndex === -1) {
                return res.status(404).json({ message: 'Reaction not found!' });
            }

            thought.reactions.splice(reactionIndex, 1);

            await thought.save();

            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};