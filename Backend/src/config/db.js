const {connect} = require("mongoose");
require('dotenv').config();

const connectDB = async()=>{
    try {
        await connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB",error.message);
        process.exit(1);
    }   
}

module.exports = connectDB;