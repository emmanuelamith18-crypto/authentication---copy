const JsonWebTokenError = require('jsonwebtoken');
dotenv = require('dotenv').config();

const authMiddleware = (req, res, next) =>{
    const tok = req.header.Authorization;
    const token=tok.split(' ')[1];
    if(!token){
        return res.status(401).json({msg: "No token, authorization denied"});
    }

    JsonWebTokenError.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err){
            return res.status(401).json({msg: "Token is not valid"});
        }
        req.user = decoded;
        next();
    });
};

module.exports = authMiddleware;