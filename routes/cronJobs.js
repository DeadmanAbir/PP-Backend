const express = require("express");
const router = express.Router();
const dotenv = require("dotenv").config();
const { sendMail } = require("../controllers/nodeMailer");
const { News, GPTResponse, User } = require("../db/indexDB");
const { getNews } = require("../controllers/postGenerator");
const { updateGPTResponse } = require("../CronScripts/cronScript");
const { dailyLinkedinPost } = require("../controllers/linkedinController");

router.post("/GPTResponseSave/:type", async (req, res) => {
    const type = req.params.type;
    try {
        const response = await getNews(type);
        console.log(response);
        if (type == "technology") {
            await GPTResponse.findByIdAndUpdate(process.env.RESPONSE_ID, { technologyNewsReponse: response });
        } else if (type == "funding") {
            await GPTResponse.findByIdAndUpdate(process.env.RESPONSE_ID, { fundingNewsReponse: response });
        } else if (type == "startups") {
            await GPTResponse.findByIdAndUpdate(process.env.RESPONSE_ID, { startupNewsReponse: response });
        }
        res.sendStatus(200);
    } catch (e) {
        console.log(e.message);
        res.status(500).send(e.message);
    }
});

router.post("/DailyPosting", async (req, res) => {
    const users = await User.find({});
    const length = users.length;
    for (let i = 0; i < length; i++) {
        const userId = users[i].user;
        const linkedlnArray = users[i].linkedin;
        console.log("user id", userId);
        for (let j = 0; j < linkedlnArray.length; j++) {
            const type = linkedlnArray[j].newsType;
            const accessToken = linkedlnArray[j].accessToken;
            const sub = linkedlnArray[j].sub;
            const to = linkedlnArray[j].email;
            const response = await GPTResponse.find({});
            const postContent = (type === "Technology") ? response[0].technologyNewsReponse :
                (type === "Funding") ? response[0].fundingNewsReponse :
                    (type === "Startups") ? response[0].startupNewsReponse :
                        null;
            try {
                await dailyLinkedinPost(postContent, accessToken, sub);
                await sendMail(to);
            } catch (e) {
                console.error(e.message);
            }
        }
    }
    res.sendStatus(200);
});

const axios = require("axios");

router.get("/test/:url", async (req, res) => {
    const url = req.params.url;
    const username = "brd-customer-hl_c0544c69-zone-unblocker";
    const password = "31tltx8tp511";
    const port = 22225;
    const session_id = (1000000 * Math.random()) | 0;
    const options = {
        auth: {
            username: `${username}-session-${session_id}`,
            password,
        },
        host: 'brd.superproxy.io',
        port,
        rejectUnauthorized: false,
    };
    try {
        console.log(url);
        const response = await axios.get(url, options);
        console.log(response);
        res.sendStatus(200);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get("/active", (req, res) => {
    res.sendStatus(200);
});


module.exports = router;
