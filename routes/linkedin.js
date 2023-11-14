const express = require("express");
const router = express.Router();
const { User } = require("../db/indexDB.js");
const { getAuthorizationUrl, saveCredentialsToMongo, getAccessToken } = require("../controllers/linkedinController.js");

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
  console.log(code)
  const accessToken = await getAccessToken(code);
  await saveCredentialsToMongo(accessToken, userId);
  res.redirect(`http://localhost:3000/dashboard?social=Linkedin`);
});

router.put('/linkedin/saveCredentials', async (req, res) => {
  const authorizationHeader = req.headers.authorization;

  const { name, newsType, schedule } = req.body;
  const userId = authorizationHeader.split(' ')[1];

  const user = await User.findOne({ user: userId });
  const newArray = user.linkedin;

  for(let i=0; i<newArray.length; i++) {
    if(newArray[i].name==""){
      newArray[i].name = name;
      newArray[i].schedule = schedule;
      newArray[i].newsType = newsType;
    }
  }
  

  const filter = { user: userId };
  const updates = { linkedin: newArray };
  const update = await User.findOneAndUpdate(filter, updates);
  res.sendStatus(200);


});

router.delete("/linkedin/deleteProject", async (req, res) => {
  const {id}=req.body;
  const authorizationHeader = req.headers.authorization;
  console.log(authorizationHeader);
  const userId = authorizationHeader.split(' ')[1];
  const user=await User.findOne({user: userId});
  const projectArray=user.linkedin;
  for(let i=0; i<projectArray.length; i++) {
    if(projectArray[i]._id==id){
      projectArray.splice(i, 1);
      break;
    }
  }
  const filter = { user: userId };
  const updates = { linkedin: projectArray };
  const update = await User.findOneAndUpdate(filter, updates);
  res.sendStatus(200);
})

module.exports = router;