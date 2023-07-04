const mongoose = require('mongoose');

const friendSchema = mongoose.Schema(
    {
        user1: {
            type: String,
            required: true,
        },
        user2: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        collection: 'friends',
    }
);

module.exports = mongoose.model('Friend', friendSchema);
