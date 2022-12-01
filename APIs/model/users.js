const validator = require("validator");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
      username:{
          type:String,
          required:true,
          min:3,
          max:20,
          unique:true,
      },
      email:{
          type:String,
          required:true,
          unique:true,
          max:50,
          validate(value){
              if(!validator.isEmail(value)){
                  throw new Error("ye sasta wala nsa nhi krna chahiye tha guru valid email dalo");
              }
          }
      },
      password:{
        type:String,
        required:true,
        min:6,
      },
      profilePicture:{
        type:String,
        default:"",
      },
      coverPicture:{
        type:String,
        default:"",
      },
      followers:{
        type:Array,
        default:[]
      }, 
      followings:{
        type:Array,
        default:[],
      },
      isAdmin:{
        type:Boolean,
        default:false,
      },   
      desc:{
        type:String,
        max:50
      },
      city:{
        type:String,
        max:50
      },
      from:{
        type:String,
        max:50
      },
      relationship:{
        type:Number,
        enum:[1,2,3]
      },
  },
  {timestamps:true}, 
  );

//collection creation
const user = new mongoose.model("user",userSchema);

module.exports = user;