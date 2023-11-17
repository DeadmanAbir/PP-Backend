const express = require("express");
const router = express.Router();
const {User}=require("../db/indexDB.js");


router.post("/checkForUser", async (req, res)=>{
  const authorizationHeader = req.headers.authorization;

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