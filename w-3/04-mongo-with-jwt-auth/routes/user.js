const { Router } = require("express");
const { User, Course } = require("../db");
const router = Router();
const userMiddleware = require("../middleware/user");
const jwt = require("jsonwebtoken");
const { jwtkey } = require("../config");


// User Routes
router.post('/signup',async (req, res) => {
    // Implement user signup logic
    try{
        const username = req.body.username;
        const password = req.body.password;
        const userfound = await User.findOne({username:username , password:password});
        if(userfound){
            res.status(409).send("user allready exist");
        }
        else{
            await User.create({
                username: username,
                password: password
            })
            res.status(200).json({
                    message: 'User created successfully' 
            })
        }
    }
    catch(e){
        res.status(500).json({
            msg: "internal server down"
        })
    }
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    try{
        const username = req.body.username;
        const password = req.body.password;
        const userfound = await User.findOne({username:username, password:password});
        // console.log(userfound);
        if(!userfound){
            res.status(404).send("Incorect username or password");
        }
        else{
            const token = jwt.sign({username} , jwtkey);
            res.status(200).json({ 
                    message: 'Admin Login successfully',
                    token: token
            });
        }
    }
    catch(e){
        res.status(500).json({
            msg: "internal server down"
        })
    }
}); 

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    try {
        const allUsers = await Course.find({});
        res.status(200).json({
            courses: allUsers,
        });
    } 
    catch (error) {
        res.status(500).send("Error retrieving users");
    }
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.username; //avoid username to access diff. jwt
    try{
        await User.updateOne({
            username:username
        },{ 
            "$push":{
                purchasedCourse: courseId
            }
        });
        res.json({
            msg:"purchase complete"
        })
    }
    catch(error){
        console.log(error); 
        res.status(500).send("internal break");
    };
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    try{
        const user = await User.findOne({
            username: req.username    //avoid username to access diff. jwt
        });
        const courses = await Course.find({
            _id: {
                "$in":user.purchasedCourse
            }
        })
        // console.log(user.purchasedCourse);
        res.json({
            courses: courses
        })
    }
    catch(e){
        res.status(500).json({
            msg: "internal server down"
        })
    }
});

module.exports = router