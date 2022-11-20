const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Enter your name"],
        unique:[true,"This user name is already added"]
    },
    bussiness_name:{
        type:String,
        required:[true,"Enter your bussiness_name"],
    },
    account_number:{
        type:Number,
        required:[true,"Enter account number"],
        unique:[true,"This account is already added"]
    },
    phone_number:{
        type:Number,
        required:[true,"Enter your phone number"],
    },
    loan:{
       amount:{
        type:Number,
        default:0
       },
       taken:{
        type:Number,
        default:0
       },
       opening_balance:{
        type:Number
       },
       date:{
        type:String
       },
       time:{
        type:String
       }
    },
    savings:{
        amount:{
            type:Number,
            default:0
           },
           taken:{
            type:Number,
            default:0
           },
           date:{
            type:String
           },
           time:{
            type:String
           }
    },
    employee:{
        type:String,
        required:true
    }
});
const model=mongoose.model("User",userSchema)

module.exports=model;