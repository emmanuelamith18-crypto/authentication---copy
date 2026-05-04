const express = require('express');
const connectDB = require('./src/config/db');
const app= express();
require('dotenv').config();
const cors = require('cors');
const router = require('./src/Router/user');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.get('/',(req,res)=>{
    res.send("Hello World");
})
app.use('/api',router);

app.listen(process.env.PORT,async()=>{
    try{
    await connectDB();
    console.log(`Server is running on port ${process.env.PORT}`);
    }
    catch(error){
        console.error("Error starting the server",error);
    }
})