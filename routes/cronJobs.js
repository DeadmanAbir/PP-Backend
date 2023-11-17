const express = require("express");
const router = express.Router();
const dotenv = require("dotenv").config();

const {News, GPTResponse}=require("../db/indexDB");
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
        res.send({message: e.message})
    }
})

module.exports =router;
