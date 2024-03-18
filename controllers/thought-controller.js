const { Thought } = require('../models')
module.exports = {
    async getThought(res) {
        try{
            const thought = await Thought.find();
            res.status(200).json(thought)
        }catch(err){
            res.status(404).json(err)
        }
    },
    
    async createThought() {
        try{

        }catch(err){
            res.status()
        }
    },

    async updateThought() {},
    
    async deleteThought() {}
    }