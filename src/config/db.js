const mongoose = require('mongoose');

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connection to mongoDB successfull");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectToDB;