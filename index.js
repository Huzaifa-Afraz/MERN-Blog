const mongoose=require('mongoose');
const express=require('express');
const Signup=require('./Routes/signup')
const Login=require('./Routes/Login')
const Fetchdata=require('./Routes/fetchuser')
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

// S
app.use('/auth',Signup)
app.use('/auth', Login)
app.use('/auth', Fetchdata)
