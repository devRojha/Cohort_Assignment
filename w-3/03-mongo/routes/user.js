const { Router } = require("express");
const { User, Course } = require("../db");
const router = Router();
const userMiddleware = require("../middleware/user");

// router.use(bodyParser.json());
// User Routes
router.post('/signup',async (req, res) => {
    // Implement user signup logic
    const username = req.headers.username;
    const password = req.headers.password;
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
    const username = req.headers.username;
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
    const user = await User.findOne({
        username: req.headers.username
    });
    const courses = await Course.find({
        _id: {
            "$in":user.purchasedCourse
        }
    })
    console.log(user.purchasedCourse);
    res.json({
        courses: courses
    })
});

module.exports = router