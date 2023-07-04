const mongoose = require('mongoose');

const teamSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please insert a team name'],
        },
        username: {
            type: String,
            required: [
                true,
                'Please insert the username of who created the team',
            ],
        },
        date: {
            type: Date,
            required: [true, 'Please insert a date'],
        },
        country: {
            type: String,
            required: [true, 'Please insert a country'],
        },
        members: {
            type: [String],
        },
    },
    {
        timestamps: true,
        collection: 'teams',
    }
);

module.exports = mongoose.model('Team', teamSchema);
