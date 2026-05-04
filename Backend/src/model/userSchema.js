const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    userName:{
        type: String,
        required: true, 
    },
    email:{
        type: String,   
        required: true,
        unique: true,
        index: true
    },  
    password:{
        type: String,
        required: true,
    },
    profilePicture:{
        type: String
    }
},{
    timestamps: true,
});

module.exports = model("User", userSchema);