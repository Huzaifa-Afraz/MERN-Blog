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
const alreadyExistedUser=await Signup.findOne({Email:req.body.Email});
if(alreadyExistedUser){
    res.json({success, msg:'user with the same email exist'})
}
    try {
        const salt = await bcryptjs.genSalt(10);
        const password = await bcryptjs.hash(req.body.Password, salt);

        const user = {
            Name: req.body.Name,
            Email: req.body.Email,
            Password: password
        };
const jwt_uri=process.env.JWT_Token;

        const signup = new Signup(user);
        await signup.save()
        const token={
            id:signup._id
        }
        const Sign_token=jwt.sign(token, jwt_uri)
        res.json({ success: true, msg:'Account successfully created' });
    } catch (error) {
        res.status(500).json({ error:errors.array(), success, msg:"some error occured try again" });
    }
});

module.exports = router;
