const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    fullName: {
        type: String,
        allowNull: false,
        required: true
    },
    email: {
        type: String,
        allowNull: false,
        primaryKey: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        allowNull: false,
        required: true
    },

    verified:{
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('users', UserSchema);