const jwt = require("jsonwebtoken");
const ErrorHander = require("./errorhandler.js");
const employee_model=require('../model/employee.js')



function verifyToken(req, res, next){
  let token = req.header("auth-token");
  if (!token) {
    return res.status(403).send({ message: "No token provided" });
  }
 
  jwt.verify(token,'udharifysecret', (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: err });
    }
    req._id = decoded.id;
    next();
  });
};

 async function isadmin(req,res,next){
  const id=req._id;
  const user=await employee_model.findById(id);
  if(user===null){
    return next(new ErrorHander('Login to continue', 405));

  }
  if(user.role!=='admin'){
    return next(new ErrorHander('Unauthorized', 401));

  }
  next()
}
module.exports={
  isadmin,verifyToken
}