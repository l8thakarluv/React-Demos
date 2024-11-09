const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchUserMiddleware = require('../middleware/fetchuser');

const JWT_SECRET = '$hhhhhh';

// here we have used express validator package here for validation

// ROUTE 1: Create a user using: POST "/api/auth/createUser", doesn't require auth
router.post('/createUser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 8 characters').isLength({ min: 8 })
], async (req, res) => {
    let success = false;
    // if there are errors, return bad request & the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, error: errors.array() });
    }
    // const userData = User(req.body);
    // userData.save();

    // check whether user with same email exists or not
    try {
        let user = await User.findOne({email: req.body.email});
        console.log('userdata------------', user);
        
        if (user) {
            return res.status(400).json({success, message: 'User with this email already exists'});
        }

        const salt = await bcrypt.genSalt(10);
        const securePass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securePass
        });

        const responseData = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(responseData, JWT_SECRET);
        console.log('jwtdataa--------', authToken);
        success = true;
        // res.json(user);
        res.json({success, authToken});
        // .then(user => res.json(user))
        // .catch(error => {
        //     console.log('errorrrrrrrrrrr', error.message);
        //     res.json(error.message);
        // });
        // res.send('User data saved successfully!!');
    } catch (err) {
        res.status(500).send('Internal server error!!');
    }
});

// ROUTE 2: Authenticate a user using: POST "api/auth/login"
router.post('/login', [
    body('email', 'Enter a valid email').exists().isEmail(),
    body('password', 'Invalid password').exists()
], async (req, res) => {
    let success = false;
    // if there are errors, return bad request or the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, message: errors.array()});
    }

    const { email, password } = req.body;
    // console.log('email-------------------', email, password);
    
    try {
        let user = await User.findOne({email: email});
        console.log('userdata--=======', user);
        
        if (!user) {
            return res.status(400).json({success, message: 'Invalid username/password!!'});
        }

        const passwordMatched = await bcrypt.compare(password, user.password);
        if (!passwordMatched) {
            return res.status(400).json ({success: success, message: 'Invalid username/password!!'});
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authToken});
    } catch (err) {
        return res.status(500).send('Internal server error!!');
    }
});

// ROUTE 3: Get logged in user details using: POST "api/auth/getUserDetails"
router.post('/getUserDetails', fetchUserMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        console.log('userid------', userId);
        
        // will get all the fields except password
        const user = await User.findById(userId).select('-password');
        console.log('userdata------------', user);
        
        res.send(user);
    } catch (error) {
        return res.status(500).send('Internal server error!!');
    }
});

module.exports = router;