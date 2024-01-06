const express=require('express')
const router=express.Router();
const User=require('../Models/Signup')
const fetchuser=require('../middleware/fetchuser')
router.post('/all-users',fetchuser, async (req,res)=>{
    const id=req.user

const user=await User.findById(id).select('-Password').sort({createdAt:-1});
res.json(user);
})
module.exports=router;