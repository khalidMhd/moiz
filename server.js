const app=require('./app.js')
const port=process.env.port ||5000;
// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
  });
app.get('/' ,(req,res)=>{
    res.send('app is working')
})
app.listen(port,()=>{
    console.log(`App is running at https://localhost:${port}`);
    
});
// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  
    server.close(() => {
      process.exit(1);
    });
  });