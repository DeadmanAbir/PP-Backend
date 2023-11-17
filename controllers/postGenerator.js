const dotenv = require("dotenv").config();
const fs = require("fs");
const OpenAI = require("openai");
const {News}=require("../db/indexDB");
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
 async function getNews(type){
    console.log("Searching News...")
    const news=await News.find({});
    const newsArray = (type === "technology") ? news[0].techNews:
                  (type === "funding") ? news[0].fundingNews :
                  (type === "startups") ? news[0].startupNews :
                  null; 

    if (newsArray.length >= 5) {
        newsArray.splice(5);
      } 
    //   console.log("newsarray", newsArray);
      let prompt = `Generate a LinkedIn post using the given title, description, and link of a news article. The post should be concise and not exceed 2000 characters. Avoid including any pretext or context in your response. Provide the news title, a brief description, and the link to the article. The news is:\n\n`;
      newsArray.forEach((i) => {
        prompt += `Title: ${i.title}\n`;
        prompt+= `Link: ${i.link}\n`;
        prompt+= `Description: ${i.desc}\n\n`;
      });


      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        model: "gpt-3.5-turbo",
      });
      const response = completion.choices[0].message.content;
   console.log("news sent")
   return response;
}

module.exports={
    getNews
}



