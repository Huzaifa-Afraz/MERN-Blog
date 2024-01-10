const express=require('express');
const router=express.Router();
const logedInUser=require('../middleware/fetchuser');
const Blog=require('../Models/Blog')
router.get('/show-blogs',logedInUser, async(req,res)=>{
let success=false;
const user=req.user;
console.log(user)
    if(!user){
        return res.status(400).json({success, msg:'user not found'})
    }
    const blogs= await Blog.findById(user);
    return blogs!==null?res.send({blogs,user}):res.send({user,msg:'blogs not found for this id'});
})

module.exports=router;