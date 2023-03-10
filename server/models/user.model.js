const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    todos: [
        {
            title: {
                type: String,
                required: true
            },
            desc: {
                type: String,
                required: true
            },
            start: {
                type: Date,
                default: Date.now
            },
            end: {
                type: Date,
                require: true
            },
            status: {
                type: String,
                required: true
            }
        }
    ]
});

const userModel = mongoose.model('UsersData', userSchema)

module.exports = userModel