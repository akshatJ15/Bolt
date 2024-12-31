const mongoose = require('mongoose');

const connectDb=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDb connected`);
    }
    catch(error){
        console.log(error);
    }
}

module.exports=connectDb;