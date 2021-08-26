const asyncHandler = require('express-async-handler')
const User = require('../models/userModel');
const generateToken = require('../utils/generateTokens');

const registerUser = asyncHandler(async (req, resp) => {
   const{name, email, password, pic } = req.body;

   const userExists = await User.findOne({ email });
   
   if(userExists){
    resp.status(400);
    throw new Error("User Already Exist");
   }

   const user = await User.create({
       name,
       email,
       password,
       pic,
   });

   if(user){
       resp.status(201).json({
           _id:user._id,
           name:user.name,
           email: user.email,
           isAdmin: user.isAdmin,
           pic:user.pic,
           token: generateToken(user._id),
       });
   } else{
         resp.status(400);
         throw new Error("Error Occured")

   }

   resp.json({    
    name,
    email,
});

});

const authUser = asyncHandler(async (req, resp) => {
    const{email, password} = req.body;
       const user = await User.findOne({email});
       
       if(user && (await user.matchPassword(password))){
           resp.json({
               _id: user._id,
               name: user.name,
               email: user.email,
               isAdmin: user.isAdmin,
               pic: user.pic,
               token: generateToken(user._id)
           });
       }

       else{
        resp.status(400);
        throw new Error("Invalid Email or Password")
       }
 });

module.exports = { registerUser, authUser };  