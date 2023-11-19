const express = require("express");
const router = express.Router();
const dotenv = require("dotenv").config();

const {News, GPTResponse, User}=require("../db/indexDB");
const { getNews } = require("../controllers/postGenerator");

router.post("/scrapeAndSave", async(req,res)=>{
    const response = await fetch(process.env.URL);

    console.log(response);
    const objs={
        techNews: response
    }
    const news=new News(objs);
    news.save();
    res.sendStatus(200);


})

router.post("/GPTResponseSave/:type", async (req, res) => {
    const type=req.params.type;
    try{

        const response=await getNews(type);
        console.log(response);
        if(type=="technology"){
            await GPTResponse.findByIdAndUpdate(process.env.RESPONSE_ID, {technologyNewsReponse: response})

        }else if(type=="funding"){
        await GPTResponse.findByIdAndUpdate(process.env.RESPONSE_ID, {fundingNewsReponse: response})

        }else if(type=="startups"){
        await GPTResponse.findByIdAndUpdate(process.env.RESPONSE_ID, { startupNewsReponse: response})
        }

     
        res.sendStatus(200);
    }catch(e){
        console.log(e.message);
        res.status(500).send(e.message);
    }
})

router.post("/DailyPosting", async(req, res) => {
    const users=await User.find({});
    const length=users.length;
    for(let i=0; i<length; i++) {
        // console.log(users[i]);
        const userId=users[i].user;
        const linkedlnArray=users[i].linkedin;
        for(let j=0; j<linkedlnArray.length; j++) {

            //posting fetch should be done here
            const response = await fetch("https://pp-backend-v6b8.onrender.com/linkedin/instantPost", {
                method: 'POST', // or 'GET', 'PUT', etc.
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${userId}`,
                },
                body: JSON.stringify({
                  name: linkedlnArray[j].name,
                  type: linkedlnArray[j].newsType,
                }),
              });
            // console.log(userId, linkedlnArray[j]);
        }
    }
     res.send(length.toString());
})

router.get("/active", (req, res) => {
    res.sendStatus(200);
})

module.exports =router;
