const express=require('express');
const router=express.Router();
const loggedInUser=require('../middleware/fetchuser');
const Blog=require('../Models/Blog')
router.get('/show-blogs',loggedInUser, async(req,res)=>{
let success=false;
const user=req.user;
// console.log(user)
    if(!user){
        return res.status(400).json({success, msg:'user not found'})
    }
    const blogs= await Blog.find({userid:user}).sort({ createdAt: -1 });
    return blogs!==null?res.send({blogs,success:true}):res.send({success,msg:'you did not published any blog yet'});
})

module.exports=router;