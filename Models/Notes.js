const mongoose=require('mongoose')
const Schema= mongoose.Schema;
const Blogs=new Schema({
    title:{
        type:String,
        require:true
    },
    descreption:{
        type:String,
        require:true
    },
    tags:{
        type:String,
        default:"Blog"
    }

},{
    timestamps:true
});
const Notes=mongoose.model('Blog', Blogs);
Notes.createIndexes();
module.exports=Blogs