const { default: mongoose } = require("mongoose");

require('dotenv').config();

const connectDB = async() => {

    try{
    await mongoose.connect(process.env.MONGO_URL);
  
     console.log(" db connection successful");
} catch(err){

console.log("db connection failed :",err.message);
process.exit(1);

}

}


module.exports = connectDB;

