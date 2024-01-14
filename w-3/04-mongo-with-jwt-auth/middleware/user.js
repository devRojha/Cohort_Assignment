const { jwtkey } = require("../config");
const { User } = require("../db");
const jwt = require('jsonwebtoken');

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    try{
        const token = req.headers.authorization;
        const word = token.split(" ");
        const jwttoken = word[1];
        const userfound = jwt.verify(jwttoken , jwtkey);
    
        if(userfound.username){
            req.username = userfound.username;   //avoid username to access diff. jwt
            next();
        }
        else{
            res.status(403).send("you are not authenticated");
        }
    }
    catch(e){
        res.status(500).json({
            msg: "internal server down"
        })
    }
}

module.exports = userMiddleware;