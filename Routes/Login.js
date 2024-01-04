const express=require('express')
const router=express.Router();
const {body, validationResult}=require('express-validator')
const Login=require('../Models/Signup')
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
const fetchdata=require('../middleware/fetchuser')

router.post(
    '/login',[
        body('Email').isEmail(),
        body('Password').exists()
    ],
    async (req, res)=>{
const Result=validationResult(req);
let success=false;
if(!Result.isEmpty()){
    return res.status(400).json({success, msg:'please correct email or password'})
};

const {Email, Password}=req.body;
try {
    let user=await Login.findOne({Email})
    // if(user){

    // }
    // else{
    //     res.status(404).json({success, msg:'please login with correct credentials'})
    // }
    let UserPasseord=bcryptjs.compare(Password, user.Password)
    if(!user || !UserPasseord){
       return res.status(404).json({success, msg:'please login with correct credentials'})
    }

    const userId={
        data:user._id
    }
    const token=jwt.sign(userId, process.env.JWT_Token)
    res.status(200).json({success:true, token, msg:'successfully logedin'})
} catch (error) {
    res.status(500).json({success, msg:'internal server error occured'})
}
    }
)

module.exports=router