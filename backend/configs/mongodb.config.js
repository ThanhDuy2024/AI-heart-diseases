// getting-started.js
const mongoose = require('mongoose');

const connectMongodb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Mongodb connected!")
    } catch (error) {
        console.log(error);
        console.log("Mongodb not connected!")
    }
}

module.exports = connectMongodb