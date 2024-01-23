const mongoose=require('mongoose');
const express=require('express');
const router=express.Router();
const Blog=require('../Models/Blog');
const User=require('../middleware/fetchuser');

router.delete('/delete/:id',User, async(req, res)=>{
let success=false;
const id=req.params.id;
if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({success,msg:'invalid Blog id'});

const user=req.user;

try {
    let blog=await Blog.findById(id);
    if(!blog) return res.status(404).json({success, msg:'blog not found'});
    if(blog.userid==user){
        blog=await Blog.findByIdAndDelete(id);
        return res.status(200).json({success:true, msg:'blog successfully deleted'});

    }
    else{
        return res.status(401).json({success, msg:'you cannot delete this blog'}).redirect('/auth/login');
    }

} catch (error) {
    throw new Error(error);
}

})
module.exports=router;