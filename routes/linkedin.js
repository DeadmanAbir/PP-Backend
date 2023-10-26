const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const TwitterApi = require("twitter-api-v2").default;
const {User}=require("../db/indexDB.js");
const {getAuthorizationUrl, saveCredentialsToMongo, getAccessToken}=require("../controllers/linkedinController.js");

router.get("/linkedin/authorize", (req, res) => {
    const uid = req.query.uid;
    req.session.uid = uid;
    res.redirect(getAuthorizationUrl());
  });

router.get("/linkedin/callback", async (req, res) => {
    const uid = req.session.uid;
    const { code } = req.query;
    const accessToken = await getAccessToken(code);
    await saveCredentialsToMongo(accessToken, uid);
    res.redirect(`http://localhost:3000/projectsection`);
  });

//all router. calls
module.exports =router;