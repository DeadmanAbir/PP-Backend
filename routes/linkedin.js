const express = require("express");
const router = express.Router();
const { User, GPTResponse } = require("../db/indexDB.js");
const { getAuthorizationUrl, saveCredentialsToMongo, getAccessToken, linkedinPost } = require("../controllers/linkedinController.js");
const { getNews } = require("../controllers/postGenerator.js");
const { sendMail } = require("../controllers/nodeMailer.js");
const dotenv = require("dotenv").config();

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
  res.redirect(`${process.env.FRONTEND_URL}/dashboard?social=Linkedin`);
});

router.put('/linkedin/saveCredentials', async (req, res) => {
  const authorizationHeader = req.headers.authorization;

  const { name, newsType, schedule } = req.body;
  const userId = authorizationHeader.split(' ')[1];

  const user = await User.findOne({ user: userId });
  const newArray = user.linkedin;

  for (let i = 0; i < newArray.length; i++) {
    if (newArray[i].name == "") {
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
  const { id } = req.body;
  const authorizationHeader = req.headers.authorization;
  console.log(authorizationHeader);
  const userId = authorizationHeader.split(' ')[1];
  const user = await User.findOne({ user: userId });
  const projectArray = user.linkedin;
  for (let i = 0; i < projectArray.length; i++) {
    if (projectArray[i]._id == id) {
      projectArray.splice(i, 1);
      break;
    }
  }
  const filter = { user: userId };
  const updates = { linkedin: projectArray };
  const update = await User.findOneAndUpdate(filter, updates);
  res.sendStatus(200);
})


router.post("/linkedin/instantPost", async (req, res) => {
  const authorizationHeader = req.headers.authorization;
  const userId = authorizationHeader.split(' ')[1];
  const { name, type } = req.body;
  const response = await GPTResponse.find({});
  const postContent = (type === "Technology") ? response[0].technologyNewsReponse :
    (type === "Funding") ? response[0].fundingNewsReponse :
      (type === "Startups") ? response[0].startupNewsReponse :
        null;
  const user = await User.findOne({ user: userId });

  const userArray = user.linkedin;
  let to;
  for (let i = 0; i < userArray.length; i++) {
    if (userArray[i].name == name) {
      to = userArray[i].email;
    }
  }




  try {
    const post = await linkedinPost(postContent, name, userArray, res);
    const mail = await sendMail(to);
    res.sendStatus(200);

  } catch (e) {
    console.log(e.message);
    res.sendStatus(500);
  }




})

module.exports = router;