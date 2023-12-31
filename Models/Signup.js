const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const signup= new Schema(
    {
        Name:{
            type:String,
            required:true
        },
        Email:{
            type:String,
            required:true
        },
        Password:{
            type:String,
            required:true
        }
    },{timestamps:true}
);
const Signup=mongoose.model('Uers',signup);
Signup.createIndexes();
module.exports=Signup;