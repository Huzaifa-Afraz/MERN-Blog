const jwt=require('jsonwebtoken')
const fetchdata=(req, res,next)=>{
const token=req.header('token')
let success=true
if(!token){
    return res.status(401).json({success, msg:"please try to login with correct crediantiels"})
}
try {
    const userdata=jwt.verify(token, process.env.JWT_Token)
     req.user=userdata.user;
     next();
} catch (error) {
    res.status(400).json({success, error})
}
}
module.exports=fetchdata;