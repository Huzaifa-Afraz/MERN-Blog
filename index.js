const mongoose=require('mongoose');
const express=require('express');
const Signup=require('./Models/Signup')
const app=express();
require('dotenv').config();
app.use(express.json)

const PORT=process.env.PORT||3000;
const URI=process.env.MONGODB_URI;

mongoose.connect(URI)
.then(()=>{app.listen(PORT, ()=>{
    console.log(`app listen on localhost:${PORT}`)
})})
.catch(err=>console.error(err))

app.post('/insert',(req,res)=>{
    
})