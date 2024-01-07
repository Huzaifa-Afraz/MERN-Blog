// const mongoose=require('mongoose')
const express=require('express');
const router=express.Router()
const {body, validationResult}=require('express-validator');
const logindata=require('../middleware/fetchuser')
const Blog=require('../Models/Blog')
router.post('/add-blog',logindata, [
body('title','minimum title length should be 5 characters').isLength({min:5}),
body('descreption','minimum descreption length should be 20 characters').isLength({min:5})
], async(req,res)=>{
    let success=false;
const validationrzlt=validationResult(req)
if(!validationrzlt.isEmpty()){
    res.status(400).json({error:validationrzlt.array()})
}
try {
    const {title,descreption,tags}=req.body;
const blog= new Blog(
    {title,descreption,tags,userid:await req.user}
)
const saveblog=await blog.save();
res.status(200).json({success:true, msg:'blog save successfully', saveblog})
} catch (error) {
    res.status(401).json({success, msg:'error to save blog', error})
}


})

module.exports=router;