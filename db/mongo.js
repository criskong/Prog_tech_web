const mongoose = require('mongoose');

async function connect() {

    try
    {
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
    }
    catch(err)
    {
        console.log("MongoDB connection error");
        console.error(err);
    }

}

module.exports = connect;