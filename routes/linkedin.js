const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const TwitterApi = require("twitter-api-v2").default;
const {User}=require("../db/indexDB.js");
const {getAuthorizationUrl, saveCredentialsToMongo, getAccessToken}=require("../controllers/linkedinController.js");

router.get("/linkedin/authorize", (req, res) => {
  const userId = req.query.userId;

  res.cookie('userId', userId, { maxAge: 900000, httpOnly: true });

    res.redirect(getAuthorizationUrl());

    console.log("reached", userId)
  });

router.get("/linkedin/callback", async (req, res) => {
  
  const userId = req.cookies.userId;

  console.log('User ID:', userId);

    const { code } = req.query;
    console.log( code)
    const accessToken = await getAccessToken(code);
    await saveCredentialsToMongo(accessToken, userId);
    res.redirect(`http://localhost:3000/dashboard?social=Linkedin`);
  });

  router.put('/linkedin/saveCredentials', async(req,res)=>{
    const authorizationHeader = req.headers.authorization;
   
    const {name,newsType, schedule}=req.body;
      const userId = authorizationHeader.split(' ')[1];
      const filter={user: userId};
      const updates={linkedin:[{name, newsType, schedule}]};
     const update=await User.findOneAndUpdate(filter,updates);
     res.sendStatus(200);


  });

//all router. calls
module.exports =router;