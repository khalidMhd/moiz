const express=require('express');
const app=express();
const connecttomongo=require('./db');
const cors=require('cors')
const errorMiddleware=require('./middlewares/errorhandler.js')
app.use(cors({
  origin : 'http://localhost:3000' ,
  
}))
connecttomongo();
app.use(express.json());
app.use('/api',require('./routes/user'));
app.use('/api',require('./routes/collection.js'));
app.use('/api',require('./routes/employee.js'));
app.use('/api',require('./routes/auth.js'));
app.use(errorMiddleware);
module.exports=app;