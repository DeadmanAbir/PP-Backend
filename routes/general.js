const express = require("express");
const router = express.Router();
const {User}=require("../db/indexDB.js");


router.post("/checkForUser", async (req, res)=>{
  const authorizationHeader = req.headers.authorization;

    const userId = authorizationHeader.split(' ')[1];
  try{
    
    const user=await User.findOne({ user: userId});
    if(!user){
      const objs={user: userId};
      const newUser= new User(objs);
      newUser.save();
    }
    res.status(200).send({message: "User created successfully"})
  }catch(e){
    console.log(e.message);
    res.status(500).send({message: e.message});
  }

    
})

router.get('/allprojects', async (req, res) => {
  const authorizationHeader = req.headers.authorization;

  const userId = authorizationHeader.split(' ')[1];

  const user = await User.findOne({ user: userId });
  
    if (!user) {
      return res.json([]);
    }
  
    const project= user.linkedin || []; 
  

    res.json( project);
  });
  

module.exports =router;