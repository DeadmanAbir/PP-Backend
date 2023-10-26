const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const TwitterApi = require("twitter-api-v2").default;
const {User}=require("../db/indexDB.js");


router.post("/createName", async (req, res)=>{
    const {name} = req.body;
    const objs={name};
    const newUser= new User(objs);
    newUser.save();
    res.json({message: "User created successfully"});
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