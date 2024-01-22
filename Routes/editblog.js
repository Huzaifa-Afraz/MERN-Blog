const mongoose=require('mongoose');
const express=require('express');
const router=express.Router();
const User=require('../middleware/fetchuser');
const Blog=require('../Models/Blog');

router.put('/update/:id',User, async (req,res)=>{
let success=false;
if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ success, msg: 'Invalid blog ID' });
  }
const {title, descreption, tags}=req.body;
const newNote={};
console.log('update api working')
if(title) newNote.title=title;
if(descreption) newNote.descreption=descreption;
if(tags)newNote.tags=tags;
const blog=await Blog.findById(req.params.id);
if(!blog) return res.status(404).json({success, msg:'Blog not found'});
const user=blog.userid;
console.log(user);
console.log(req.user);
if(user!=req.user) return res.status(401).json({success, msg:'unauthorized please login again'}).redirect('/api/login');
const updatedNote=await Blog.findByIdAndUpdate(req.params.id, {$set:newNote}, {new:true})
if(updatedNote) return res.status(200).json({success:true, msg:"Blog successfully updated"});
res.status(500).json({success, msg:'internal server error'});
});

module.exports=router;