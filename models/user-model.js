const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true 
        },
        email: {
            stype: String,
            required: true,
            unique: true,
            Validate: /^\S+@\S+\.\S+$/
        },
        thoughts: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Thought'
        },
        friends: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }
)

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
