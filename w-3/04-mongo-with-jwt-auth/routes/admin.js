const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();
const jwt = require("jsonwebtoken");
const { jwtkey } = require("../config");


// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    try{
        const username = req.body.username;
        const password = req.body.password;
        const userfound = await Admin.findOne({username:username});
        console.log(userfound);
        if(userfound){
            res.status(404).send("User Allrady Exist");
        }
        else{
            // const token = jwt.sign({username} , jwtkey);
            await Admin.create({
                username: username,
                password: password
            });
            res.status(200).json({ 
                    message: 'Admin created successfully',
                    // token: token
            });
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
        const userfound = await Admin.findOne({username:username, password:password});
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

router.post('/courses',adminMiddleware, async (req, res) => {
    // Implement course creation logic
    try{
        const title = req.body.title;
        const price = req.body.price;
        const description = req.body.description;
        const image = req.body.image
        const coursefind = await Course.findOne({title:title});
        console.log(coursefind);
        if(coursefind){
            res.status(403).json("course allready exist");
        }
        else{
            const newcourse = await Course.create({
                title: title,
                description: description,
                price: price,
                image: image
            }) 
            res.status(200).json({
                    message: 'Course created successfully',
                    courseId: newcourse._id
            });
        }
    }
    catch(e){
        res.status(500).json({
            msg: "internal server down"
        })
    }
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    try {
        const allcourses = await Course.find({});
        res.status(200).json({
            courses: allcourses
        });
    } catch (error) {
        res.status(500).send("Error retrieving users");
    }

});

module.exports = router;