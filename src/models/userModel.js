const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        fullname: {
            type: String,
            required: [true, 'Please insert a name'],
        },
        email: {
            type: String,
            required: [true, 'Please insert an email'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Please insert a password'],
        },
        resetCode: {
            type: String,
            required: [true, 'Please insert a resetCode'],
            unique: true,
        },
        birthdate: {
            type: Date,
            required: [true, 'Please insert a birthdate'],
        },
        country: {
            type: String,
            required: [true, 'Please insert a country'],
        },
        phoneNumber: {
            type: String,
            required: [true, 'Please insert a phoneNumber'],
            unique: true,
        },
    },
    {
        timestamps: true,
        collection: 'users',
    }
);

module.exports = mongoose.model('User', userSchema);
