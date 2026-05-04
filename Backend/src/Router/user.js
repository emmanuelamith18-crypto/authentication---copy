const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../Models/User');
const jwt = require('jsonwebtoken');
const localStorage = require('localStorage');
const upload = require('../middleware/multer');
require('dotenv').config();




router.post("/register",upload.single('profilePicture'), async (req, res) => {
    const {userName, email, password} = req.body;
    try{
    if(!userName || !email || !password){
        return res.status(400).json({msg: "Please enter all fields"});
    }
    bcrypt.hash(password, 10, async (err, hash) => {
        if(err){
            console.error("Error hashing password:", err);
            return res.status(500).json({msg: "Server error"});
        }
        const user = new User({
        userName,
        email,
        password: hash,
        profilePicture:req.file.path
    });
    await user.save()
    res.status(200).json({msg: "User registered successfully"});
    });
}
catch(err){
    console.error("Error registering user:", err);
    res.status(500).json({msg: "Server error"});
}
    

});

router.post("/login", async (req, res) => {
    const {email, password} = req.body;
    try{
        if(!email || !password){
            return res.status(400).json({msg: "Please enter all fields"});
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({msg: "User not found"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({msg: "Invalid credentials"});
        }
        res.status(200).json({msg: "Login successful"});
        jwt.sign({email: user.email}, process.env.JWT_SECRET, {expiresIn: "1h"}, (err, token) => {
            if(err){
                console.error("Error generating token:", err);
                return res.status(500).json({msg: "Server error"});
            }
            console.log("Generated token:", token);
            localStorage.setItem('token', token);
            res.setHeader('Authorization', `Bearer ${token}`);
            res.status(200).json({token});
        });
    }
    catch(err){
        console.error("Error logging in:", err);
        res.status(500).json({msg: "Server error"});
    }
}); 

router.get('/', async(req, res) => {
    try{
        const users = await User.find();
        res.status(200).json(users);

    }
    catch(err){
        console.error("Error fetching data:", err);
        res.status(500).json({msg: "Server error"});
    }

});

router.get('/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({msg: "User not found"});
        }
        res.status(200).json(user);
    }
    catch(err){
        console.error("Error fetching data:", err);
        res.status(500).json({msg: "Server error"});
    }
});

router.put('/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const updatedUser = await User.findByIdAndUpdate(id, req.body, {new: true});
        if(!updatedUser){
            return res.status(404).json({msg: "User not found"});
        }
        res.status(200).json(updatedUser);
    }   
    catch(err){
        console.error("Error updating data:", err);
        res.status(500).json({msg: "Server error"});
    }       
});

router.delete('/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if(!deletedUser){
            return res.status(404).json({msg: "User not found"});
        }
        res.status(200).json({msg: "User deleted successfully"});
    }
    catch(err){
        console.error("Error deleting data:", err);
        res.status(500).json({msg: "Server error"});
    }   
});

module.exports = router;