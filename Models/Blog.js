const mongoose=require('mongoose')
const Schema= mongoose.Schema;
const Blogs=new Schema({
    userid:{
type:mongoose.Schema.Types.ObjectId,
ref:'Uers',
require:true
    },
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
const blog=mongoose.model('Blog', Blogs);
blog.createIndexes();
module.exports=blog;