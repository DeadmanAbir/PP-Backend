const mongoose = require('mongoose');
const express = require("express");
const linkedinRouter = require("./routes/linkedin");
const generalRouter = require("./routes/general");
const cronJobs=require("./routes/cronJobs");
const cookieParser = require('cookie-parser');
const dotenv = require("dotenv").config();
const app = express();
const cors = require('cors');
const cron = require('node-cron');
const { updateGPTResponse } = require('./CronScripts/cronScript');

app.use(cors());
app.use(express.json());
app.use(cookieParser()); // Middleware to parse cookies

app.use("", linkedinRouter);
app.use("/cronJobs", cronJobs );

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const PORT=process.env.PORT  || 5000;
const checkUserIdMiddleware = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
  
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      
      return res.status(401).json({ error: 'Unauthorized access. Bearer token is missing.' });
    }
  
    const token = authorizationHeader.split(' ')[1];
  
    req.userId = token;
  console.log("approved", token)
    next();
  };

app.use(checkUserIdMiddleware);
app.use("/general", generalRouter);



cron.schedule('26 12 * * *', async() => {
  console.log('running the cron job for saving GPT Response');
  try{
    const job= await updateGPTResponse();
  }catch(e){
    console.log(e.message);
  }
});

cron.schedule('45 10 * * *', () => {
  console.log('Running every day at 3:40 PM IST');
});




app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
