import mongoose = require("mongoose");

const connectDB = async () =>{
    try {
        const mongo_uri = process.env.MONGO_URI
        if (!mongo_uri) throw Error();
        await mongoose.connect(mongo_uri);
        const dbName = mongoose.connection.name
        console.log(`Connected to database: ${dbName}`)
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;