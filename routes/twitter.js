const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const TwitterApi = require("twitter-api-v2").default;
const {User}=require("../db/indexDB.js");


const twitterClient = new TwitterApi({
    clientId: "UVBqTk9JR0xMOFdJR3ZSMWVrZm86MTpjaQ",
    clientSecret: "VG7ju1SFziBc9U3kMp_-iTw5PmWlK6kXmNqaMgXeIxRa2C724-",
  });

// router.post("/postGenerator/twitter", async (req, res) => {
//     const { type, email, uid } = req.body;
//     console.log(type);
//     const socialMedia = "Twitter";
//     try {
//       // const response= await run(type);
//       const post = await twitterPost(type, uid, socialMedia);
//       console.log(post);
//       const mail = sendMail(email, socialMedia);
//       res.status(200);
//     } catch (e) {
//       console.log(e);
//     }
//   });
  
  // Authorize with Twitter
  router.get("/auth/twitter", async (req, res) => {
    // const uid = req.query.uid;
    // req.session.uid = uid;
    const callbackURL="http://localhost:5000/auth/twitter/callback"
    const { url, codeVerifier, state } = twitterClient.generateOAuth2AuthLink(
      callbackURL,
      {
        scope: ["tweet.read", "tweet.write", "users.read", "offline.access"],
      }
    );
    // req.session.codeVerifier = codeVerifier;
    const filter={name: "Abir Dutta"};
    const updates={twitter:[{codeVerifier}]};
   const update=await User.findOneAndUpdate(filter,updates);
    // await superbase
    //   .from("twitter")
    //   .insert({ uid: uid, state: state, codeverifier: codeVerifier });

    res.redirect(url);
  });
  
  // Callback for Twitter authorization
  router.get("/auth/twitter/callback", async (req, res) => {
    const { state, code } = req.query;
    console.log(code);
    // const uid = req.session.uid;
    // const codeVerifier = req.session.codeVerifier;
    const user=await User.findOne({ name: "Abir Dutta" })
    const codeVerifier=user.twitter[0].codeVerifier;
    const callbackURL="http://localhost:5000/auth/twitter/callback"

    const {
      client: loggedClient,
      accessToken,
      refreshToken,
    } = await twitterClient.loginWithOAuth2({
      code,
      codeVerifier,
      redirectUri: callbackURL,
    });
    console.log("new code", codeVerifier);
  
    
    const filter={name: "Abir Dutta"};
    const updates={twitter:[{accessToken,refreshToken}]};
   const update=await User.findOneAndUpdate(filter,updates);
  
    // eslint-disable-next-line max-len
    // const { data } = await loggedClient.v2.me(); // start using the client if you want
    res.redirect(`http://localhost:3000/dashboard?method=Twitter`)
  });
  

module.exports =router;
