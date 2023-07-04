const mongoose = require('mongoose');

const gameSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        idTeam1: {
            type: String,
            required: true,
        },
        idTeam2: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        gameDateTime: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
        info: {
            goals1: {
                type: Number,
                required: false,
            },
            goals2: {
                type: Number,
                required: false,
            },
            win: {
                type: String,
                required: false,
            },
        },
    },
    {
        timestamps: true,
        collection: 'games',
    }
);

module.exports = mongoose.model('Game', gameSchema);

/*
Se for pending, não tem dados "EXTRA",
se for approved, Dados mas vazio,
ser for rejected, "",
se for finished, dados completos

*/
