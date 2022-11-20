const mongoose=require('mongoose');
const uri='mongodb+srv://loan21:loan21@cluster0.i6x39wy.mongodb.net/udharify?retryWrites=true&w=majority';
const connecttomongo=()=>{
    mongoose.connect(uri).then((data)=>{
        console.log('Connected to databse successfully '+ data.Connection.name)
    }).catch((err)=>{
        console.log(err);
    })
};
module.exports=connecttomongo;
