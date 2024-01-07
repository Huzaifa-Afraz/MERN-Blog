const express=require('express')
const router=express.Router();
const User=require('../Models/Signup')
const fetchuser=require('../middleware/fetchuser')
router.post('/all-users',fetchuser, async (req,res)=>{
    let success=false;
    const id=req.user
if(id){
const user=await User.findById(id).select('-Password');
res.status(200).json({success,user});
}
else{
    res.status(404).json({success, msg:'user not found'});
}
})
module.exports=router;