const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Signup = require('../Models/Signup');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/signup', [
    body('Name').isLength({ min: 3 }),
    body('Email').isEmail(),
    body('Password').isLength({ min: 5 })
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {
        const salt = await bcryptjs.genSalt(10);
        const password = await bcryptjs.hash(req.body.Password, salt);

        const user = {
            username: req.body.Name,
            Email: req.body.Email,
            Password: password
        };

        const data = {
            data: user
        };

        const JWT_token = process.env.JWT_Token;
        const jwtData = jwt.sign(data, JWT_token);

        console.log(jwtData);

        const signup = new Signup(user);
        await signup.save((err) => {
            if (err) {
                return res.status(500).json({ error: err, success });
            }
            res.json({ success: true, signup });
        });
    } catch (error) {
        res.status(500).json({ error, success });
    }
});

module.exports = router;
