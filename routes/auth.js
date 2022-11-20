const express=require('express');
const router = express.Router();
const asyncerror = require('../middlewares/catchasyncerror');
const ErrorHandler = require('../middlewares/errorhandler');
const usermodel=require('../model/user.js');
const employee_model=require('../model/employee.js');
const jwt = require('jsonwebtoken');

//login
router.post('/login',asyncerror(async(req,res,next)=>{
const {email,password}=req.body;
console.log(email,password)
const user=await employee_model.findOne({email});
if(!user){
    return next(new ErrorHandler('Enter valid email',404))
}
if(user.password!==password){
    return next(new ErrorHandler('Enter valid credentials',404))
}
const token= jwt.sign({id:user._id},'udharifysecret')
res.status(201).json({success:true,token})
}))

module.exports=router