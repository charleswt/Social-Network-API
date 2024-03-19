const { Thought, User } = require('../models');

module.exports = {
    async getThought(req, res) {
        try {
            const thought = await Thought.find();

            if (!thought.length) {
                return res.status(404).json({ message: 'No results! Make sure to run seed!' });
            }
            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getOneThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params._id });

            if (!thought) {
                return res.status(404).json({ message: 'No results! Thought does not exist!' });
            }
            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createThought(req, res) {
        try {
            const validUsername = await User.findOne({ username: req.params.username });

            if (!validUsername) {
                return res.status(404).json({ message: 'Please input an existing username' });
            }

            const thought = await Thought.create({
                thoughtText: req.body.thoughtText,
                username: req.body.username
            });

            if (!req.body.thoughtText || !req.body.username) {
                return res.status(400).json({ message: 'Please input string for thoughtText and an existing username!' });
            }
            consoel.log(thought)
            
            validUsername.thoughts.push(thought._id)

            await validUsername.save()

            res.status(201).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params._id },
                { thoughtText: req.body.thoughtText },
                { new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'Thought not found!' });
            }

            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params._id });

            if (!thought) {
                return res.status(404).json({ message: 'Thought not found!' });
            }

            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}