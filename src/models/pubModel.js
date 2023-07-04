const mongoose = require('mongoose');

const pubSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [
                true,
                'Please insert the usernaname of who created this post',
            ],
        },
        date: {
            type: Date,
            required: [true, 'Please insert a date'],
        },
        content: {
            type: String,
            required: [true, 'Please insert a country'],
        },
        profileImage: {
            type: Number,
        },
    },
    {
        timestamps: true,
        collection: 'pubs',
    }
);

module.exports = mongoose.model('Pub', pubSchema);
