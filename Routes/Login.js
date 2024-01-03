const express=require('express')
const Router=express.Router();
const {body, validationResult, validationResult}=require('express-validator')
const Login=require('../Models/Signup')
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')


Router.post(
    '/login',[
        body('Email').isEmail(),
        body('Password').exists()
    ],
    async (req, res)=>{
const validationResult=validationResult(req)
if(validationResult.isEmpty()){
    
}
    }
)