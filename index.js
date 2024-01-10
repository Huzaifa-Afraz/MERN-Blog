const mongoose=require('mongoose');
const express=require('express');
const Signup=require('./Routes/signup')
const Login=require('./Routes/Login')
const Fetchdata=require('./Routes/fetchuser')
const addBlog=require('./Routes/addblog')
const allBlogs=require('./Routes/show-blog')
const app=express();
require('dotenv').config();
app.use(express.json())

const PORT=process.env.PORT||3000;
const URI=process.env.MONGODB_URI;

mongoose.connect(URI)
.then(()=>{app.listen(PORT, ()=>{
    console.log(`app listen on localhost:${PORT}`)
})})
.catch(err=>console.error(err))

app.use('/auth',Signup)
app.use('/auth', Login)
app.use('/auth', Fetchdata)
app.use('/api', addBlog);
app.use('/api', allBlogs);
