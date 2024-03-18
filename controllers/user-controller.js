const { User } = require('../models')
module.exports = {
    async getUser(res) {
        try{
            const user = await User.find();
            res.status(200).json(user)
        }catch(err){
            res.status(404).json(err)
        }},
    
    async createUser(req, res) {
        try{
            const user = User.create({ username: req.body, email: req.body+'@gmail.com'})
            res.status(200).json(user)
        }catch(err){
            res.status(404).json(err)
        }
    },

    async updateUser() {
        try{
            const user = User.findOneAndUpdate()
            res.status(200).json(user)
        }catch(err){
            res.status(404).json(err)
        }
    },
    
    async deleteUser() {
        try{
            const user = User.findOneAndDelete({ username: req.body })
            res.status(200).json(user)
        }catch(err){
            res.status(404).json(err)
        }
    }
    }