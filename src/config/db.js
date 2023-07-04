const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB Connected: ${con.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

const disconnectDB = async () => {
    try {
        const con = await mongoose.disconnect();
        console.log('Disconnected from DB');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};
module.exports = {
    connectDB,
    disconnectDB,
};
