const { User } = require('../models')
module.exports = {
    async getUser(res) {
        try{
            const user = await User.find();

            if(!user.length){
                return res.status(404).json({ message: 'No results! Make sure to run seed!' })
            }
            res.status(200).json(user)
        }catch(err){
            res.status(404).json(err)
        }},
    
    async createUser(req, res) {
        try{
            const user = User.create({ username: req.body, email: req.body+'@gmail.com'})

            if(!req.body){
                return res.status(404).json({ message: 'Please input username to create user!' })
            }
            res.status(200).json(user)
        }catch(err){
            res.status(404).json(err)
        }
    },

    async updateUser(req, res) {
        try{
            const user = User.findOneAndUpdate({ _id: req.body.username }, { $set: req.body }, 
                { runValidators: true, new: true })

                if(!user){
                    return res.status(404).json({ message: 'User does not exist! Could not update user!'})
                }
            res.status(200).json(user)
        }catch(err){
            res.status(404).json(err)
        }
    },
    
    async deleteUser(req, res) {
        try{
            const user = User.findOneAndDelete({ _id: req.body.username })

            if(!user){
                return res.status(404).json({ message: 'User does not exist! Could not delete user!'})
            }
            res.status(200).json(user)
        }catch(err){
            res.status(404).json(err)
        }
    }
    }