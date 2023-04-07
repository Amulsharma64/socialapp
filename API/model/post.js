const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    userId:{
      type:String,
      required:true
    },
    desc:{
      type:String,
      max:500
    },
    img:{
      type:String
    },
    likes:{
      type:Array,
      default:[]
    },
  },
  {timestamps:true}
);

//collection creation
const post = new mongoose.model("post",postSchema);

module.exports = post;