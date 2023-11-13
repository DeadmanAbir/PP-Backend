const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const TwitterApi = require("twitter-api-v2").default;
const {User}=require("../db/indexDB.js");


router.post("/checkForUser", async (req, res)=>{
  const authorizationHeader = req.headers.authorization;
  console.log(authorizationHeader);
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      // If the Bearer token is not present, you can handle unauthorized access
      return res.status(401).json({ error: 'Unauthorized access. Bearer token is missing.' });
    }
  
    const userId = authorizationHeader.split(' ')[1];
  
    const user=await User.findOne({ user: userId});
    if(user){
      return res.sendStatus(200);

    }else{
      const objs={user: userId};
      const newUser= new User(objs);
      newUser.save();
      return res.json({message: "User created successfully"});
    }
    
})

router.get('/allprojects/:userName', async (req, res) => {
    const userName = req.params.userName;
    const user = await User.findOne({ name: userName });
  
    if (!user) {
      return res.json([]);
    }
  
    const project1 = user.twitter || []; 
    const project2 = user.linkedin || []; 
  
    const projects = [...project1, ...project2]; 
  
    res.json( projects );
  });
  

//all router. calls
module.exports =router;