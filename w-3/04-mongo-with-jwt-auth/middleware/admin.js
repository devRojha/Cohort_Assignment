const { jwtkey } = require("../config");
const { Admin } = require("../db");
const jwt = require('jsonwebtoken');

// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    try{
        const token = req.headers.authorization;
        const word = token.split(" ");
        const jwttoken = word[1];
        const userfound = jwt.verify(jwttoken , jwtkey);
        if(userfound.username){
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

module.exports = adminMiddleware;