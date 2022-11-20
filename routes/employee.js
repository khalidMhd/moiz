const express=require('express');
const router = express.Router();
const asyncerror = require('../middlewares/catchasyncerror');
const employee_model=require('../model/employee.js');
const jwt = require("jsonwebtoken");
const {isadmin,verifyToken}=require('../middlewares/authentication.js')
//Add enployee
router.post('/addemployee',verifyToken,isadmin,asyncerror(async(req,res,next)=>{
    console.log(req.body)
const newemployee=await employee_model.create(req.body);
const token =jwt.sign({id:newemployee._id},'udharifysecret')
res.status(201).json({success:true,newemployee,token})
}));
//get all number of emplpoyee
router.get('/getallemployee',verifyToken,isadmin,asyncerror(async(req,res,next)=>{
const allemployee=await employee_model.find({role:'employee'})
res.status(201).json({success:true,allemployee})
}));

module.exports=router