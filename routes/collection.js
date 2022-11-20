const express = require('express');
const router = express.Router();
const asyncerror = require('../middlewares/catchasyncerror');
const ErrorHandler = require('../middlewares/errorhandler');
const usermodel = require('../model/user.js');
const employee_model = require('../model/employee.js');
const collection = require('../model/collections.js')
const { isadmin, verifyToken } = require('../middlewares/authentication.js')

//get all collection
router.get('/getallcollection', verifyToken, asyncerror(async (req, res, next) => {
    const id = req._id
    const me =await employee_model.findById(id)
    console.log(me)
    let alldata;
    if (me.role === 'admin') {
        console.log('admin')
        if (req.query.dailyreportdate) {
            alldata = await collection.find({ date: req.query.dailyreportdate })
        } else {
            alldata = await collection.find()
        }
    }
    else {
        console.log(me.name)

        if (req.query.dailyreportdate) {
            alldata = await collection.find({ date: req.query.dailyreportdate, employee: me.name })
        } else {
            console.log('init')
            alldata = await collection.find({ employee: me.name })
        }


    }
    let total_savings_collection=0;
    let total_loan_collection=0;
    alldata.forEach(elem=>{
        total_loan_collection+=elem.loan;
        total_savings_collection+=elem.savings;
    });
    res.status(201).json({ success: true, alldata ,total_loan_collection,total_savings_collection})
}))
module.exports = router