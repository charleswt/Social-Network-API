const connection = require('../config/connection');
const { User, Thought } = require('../models/index');
const { reactionData, thoughtsData, usernameData } = require('./data');

console.time('seeding');
connection.once('open', async (res) => {
    try{
        let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
        if (userCheck.length) {
          await connection.dropCollection('users');
        }
      
        let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
        if (thoughtCheck.length) {
          await connection.dropCollection('thoughts');
        }
      
        const users = await User.create(usernameData.map(username => (
            { username, email: `${username.toLowerCase()}@example.com`}
        )))
        const thoughts = await Thought.create(thoughtsData.map((thought, index) => (
            { thoughtText: thought, username: users[index % users.length].username }
        )))

        await Promise.all(thoughts.map((thought, index) => {
            const reaction = reactionData[index % reactionData.length];
            thought.reactions.push({ 
                reactionBody: reaction, 
                username: users[index % users.length].username
                });
                return thought.save()
        }))
        console.log('Data seeded!')
    }catch(err){
        console.error('Error when trying to seed data', err);
        res.status(500).json({ message: "Error when trying to seed data", err });
    }finally{
        console.timeEnd('seeding');
        await connection.close();
    }
})
