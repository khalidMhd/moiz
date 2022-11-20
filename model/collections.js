const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    date:{
        type:String,
    },
    time:{
        type:String,
    },
    loan:{
        type:Number
    },
    loantaken:{
        type:Number
    },
    loandate:{
        type:String
    },
    savingsdate:{
        type:String
    },
    savings:{
        type:Number
    },
    account:{
        type:Number
    },
    total_loan:{
        type:Number
    },
    total_savings:{
        type:Number
    },
    employee:{
        type:String
    }
});
const model=mongoose.model("Collections",userSchema)

module.exports=model;