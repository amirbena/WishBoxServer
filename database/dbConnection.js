const mongoose = require('mongoose');

const connectToDB = async () => {
    const dbConnection = process.env.MONGODB_URI || "mongodb://localhost:27017/herolo";
    try {
        await mongoose.connect(dbConnection, {
            useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true
        });
        console.log("DB CONNECTED");
        mongoose.Promise = global.Promise;
        
    } catch (error) {
        console.error("Can't connect to db");
    }
}

connectToDB();