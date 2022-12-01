const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
mongoose.connect("mongodb+srv://amul-admin:m001-mongodb-basics@sandbox.irldqbr.mongodb.net/DataBase")
.then(()=>{
    console.log("database connection stablished successfully...");
}).catch((err)=>{
    console.log("no connection ");
});

