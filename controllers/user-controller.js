const { User } = require('../models');

module.exports = {
    async getUser(res) {
        try {
            const users = await User.find();

            if (!users.length) {
                return res.status(404).json({ message: 'No results! Make sure to run seed!' });
            }
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getOneUser(req, res) {
        try {
            const user = await User.findOne({ username: req.params.username });

            if (!user) {
                return res.status(404).json({ message: 'No results! User does not exist!' });
            }
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    
    async createUser(req, res) {
        try {
            if (!req.body.username) {
                return res.status(400).json({ message: 'Please input username to create user!' });
            }

            const user = await User.create({
                username: req.body.username,
                email: req.body.username + '@gmail.com'
            });

            res.status(201).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { username: req.params.username },
                { $set: req.body }, 
                { runValidators: true, new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'User does not exist! Could not update user!' });
            }

            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ username: req.params.username });

            if (!user) {
                return res.status(404).json({ message: 'User does not exist! Could not delete user!' });
            }

            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};