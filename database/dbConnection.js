const mongoose = require('mongoose');



const dbConnection = process.env.MONGODB_URI || "mongodb://localhost:27017/herolo";

mongoose.connect(dbConnection, {
    useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true
}).then(()=>{
    console.log("DB CONNECTED");
    mongoose.Promise = global.Promise;
}).catch(ex=>{
    console.error("Can't connect to db ",ex);
});
