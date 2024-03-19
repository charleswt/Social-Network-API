const { User } = require('../models');
const mongoose = require('mongoose');
module.exports = {
    async getUser(req, res) {
        try {
            const users = await User.find();
            if (!users) {
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
    },

    async addFriend(req, res) {
        try {
            const { friendUser } = req.params;
            const username = req.body.username;
    
            if (!username) {
                return res.status(400).json({ message: 'Enter your username.' });
            }
    
            const user = await User.findOne({ username });
    
            if (!user) {
                return res.status(404).json({ message: 'User does not exist! Try again!' });
            }
    
            const friend = await User.findOne({ username: friendUser });
    
            if (!friend) {
                return res.status(404).json({ message: 'Friend does not exist! Try again!' });
            }
    
            if (user.friends.includes(friend._id)) {
                return res.status(400).json({ message: 'You are already friends with this user!' });
            }

            user.friends.push(friend._id);
            await user.save();
    
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    
    async deleteFriend(req, res) {
        try {
            const { friendUser } = req.params;
            const username = req.body.username;

            if (!username) {
                return res.status(400).json({ message: 'Enter your username.' });
            }
            const friend = await User.findOne({ username: friendUser });
    
            if (!friend) {
                return res.status(404).json({ message: 'Friend does not exist! Try again!' });
            }

            const user = await User.findOne({ username });

            if (!user) {
                return res.status(404).json({ message: 'User does not exist! Try again!' });
            }

            const friendIndex = user.friends.indexOf(friend._id);

            if (friendIndex === -1) {
                return res.status(404).json({ message: 'Friend not found!' });
            }

            user.friends.splice(friendIndex, 1);
            await user.save();

            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};