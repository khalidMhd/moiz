const express=require('express');
const router = express.Router();
const asyncerror = require('../middlewares/catchasyncerror');
const ErrorHandler = require('../middlewares/errorhandler');
const usermodel=require('../model/user.js');
const collection=require('../model/collections.js')
const employee_model=require('../model/employee.js')
const {isadmin,verifyToken}=require('../middlewares/authentication.js')

/// Add user
router.post('/adduser',verifyToken,isadmin,asyncerror(async(req,res,next)=>{
    if(req.body.phone_number.toString().length!==10){
        return next(new ErrorHandler('length of phone number should be 10',405))
    }
 const check=await employee_model.find({name:req.body.employee})
 if(check===undefined){
   return next(new ErrorHandler('Enter valid employee',404))
 }
const newuser=await usermodel.create(req.body);
res.status(201).json({success:true,newuser});
}))
/// Get users
router.get('/getusers',verifyToken,asyncerror(async(req,res,next)=>{
const me=await employee_model.findById(req._id);
let allusers;
if(me.role==='admin'){
allusers=await usermodel.find();
}else{
allusers=await usermodel.find({employee:me.name});
}
let All_loan=0;
let All_savings=0;
allusers.forEach((elem)=>{
All_loan+=elem.loan.amount;
All_savings+=elem.savings.amount;
})
res.status(201).json({success:true,allusers,All_loan,All_savings})
}))
/// Delete user
router.post('/deleteuser',verifyToken,isadmin,asyncerror(async(req,res,next)=>{
 await usermodel.findByIdAndDelete(req.body.id);
 console.log(req.body.id)
res.status(201).json({success:true})
}))
/// Delete Loan
router.post('/deleteloan',verifyToken,isadmin,asyncerror(async(req,res,next)=>{
const user= await usermodel.findByIdAndUpdate(req.body.id,{loan:{amount:0}});
res.status(201).json({success:true,user})
}))
/// Delete savings
router.post('/deletesavings',verifyToken,isadmin,asyncerror(async(req,res,next)=>{
const user= await usermodel.findByIdAndUpdate(req.body.id,{savings:{amount:0}});
res.status(201).json({success:true,user})
}))
///Add loan

router.post('/addloan',verifyToken,isadmin,asyncerror(async(req,res,next)=>{
  const {amount,User,date,time,opening_balance}=req.body;
  let newuser;
     if(amount!==undefined&&User!==undefined&&date!==undefined&&time!==undefined&&opening_balance!==undefined){
        var obj={amount,date,time,opening_balance,taken:amount}
        newuser=await usermodel.findOneAndUpdate({name:User},{loan:obj})
     }else{
        return next(new ErrorHandler('Enter all fields',405))
     }
res.status(201).json({success:true,newuser})
}))
///Add Savings

router.post('/addsavings',verifyToken,isadmin,asyncerror(async(req,res,next)=>{
  const {amount,user,date,time}=req.body;
  let newuser;
     if(amount!==undefined&&user!==undefined&&date!==undefined&&time!==undefined){
        var obj={amount,date,time,taken:amount}
        newuser=await usermodel.findOneAndUpdate({name:user},{savings:obj})
     }else{
        return next(new ErrorHandler('Enter all fields',405))
     }
res.status(201).json({success:true,newuser})
}))
///Add Collection

router.post('/addcollection',verifyToken,asyncerror(async(req,res,next)=>{
  const {loan,savings,date,time,user}=req.body;
  let newuser;
  let collection_result;
     if(loan,savings,date,time,user){
        var thisuser=await usermodel.findOne({name:user});
        //update loan
        var updated_loan={
            amount:Number(thisuser.loan.amount)-Number(loan),
            taken:thisuser.loan.taken,
            opening_balance:thisuser.loan.opening_balance,
            date:thisuser.loan.date,
            time:thisuser.loan.time
        }
         await usermodel.updateOne({name:user},{loan:updated_loan});
         //update savings
         var updated_savings={
            amount:Number(thisuser.savings.amount)+Number(savings),
            taken:thisuser.savings.taken,
            date:thisuser.savings.date,
            time:thisuser.savings.time
        }
        await usermodel.updateOne({name:user},{savings:updated_savings});
        //
       let updateduser=await usermodel.findOne({name:user})
       //Create collection

        collection_result=await collection.create({
         loan:Number(loan),
         savings:Number(savings),
         date,
         time,
         name:user,
         account:updateduser.account_number,
         total_loan:Number(updateduser.loan.amount),
         total_savings:Number(updateduser.savings.amount),
         employee:updateduser.employee,
         loandate:updateduser.loan.date,
         savingsdate:updateduser.savings.date,
         loantaken:updateduser.loan.taken

       })
     }else{
        return next(new ErrorHandler('Enter all fields',405))
     }
     console.log(thisuser.loan.taken)
     console.log(thisuser.name)
res.status(201).json({success:true,collection_result,oldloan:thisuser.loan.amount,
  oldsavings:thisuser.savings.amount,loandate:thisuser.loan.date,savingsdate:thisuser.savings.date})
}))

module.exports=router