const router = require("express").Router();
const User = require("../model/users");
const bcrypt = require("bcrypt");

// REGISTER
router.post("/register", async (req, res)=>{
   try{
      // generating new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      // creating new user
      const newUser = new User({
         username:req.body.username,
         email:req.body.email,
         password:hashedPassword,
        })
// save new user and return response
      const user = await newUser.save();
      res.status(200).json(user);
    
   }catch(e){
    res.status(401).send(e);
   }
});

// LOGIN
router.post("/login", async(req, res)=>{
   try{
      const user = await User.findOne({email:req.body.email});
      !user && res.status(404).json("user not found");

      const validPassword = await bcrypt.compare(req.body.password, user.password);
      !validPassword && res.status(400).json("wrong password");
      
      res.status(200).send(user);
   }catch(e){
      console.log(e);
      res.status(401).send(e);
   }
   
});




module.exports = router;