const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    user: String,
 
    linkedin: [{
        name: String,
        sub: String,
        accessToken: String,
        newsType: String,
        schedule: String,
        email: String
      }]
  });

  const gptSchema=new mongoose.Schema({
    fundingNewsReponse: String,
    startupNewsReponse: String,
  technologyNewsReponse: String
  })

  const newsSchema = new mongoose.Schema({
    fundingNews: [{
      title: String,
      desc: String,
      link: String
    }],
    techNews:  [{
      title: String,
      desc: String,
      link: String
    }],
    startupNews:  [{
      title: String,
      desc: String,
      link: String
    }],
    
  });

  const User = mongoose.model('User', userSchema);
const News=mongoose.model("News", newsSchema);
const GPTResponse=mongoose.model("GPTResponse", gptSchema);
  module.exports={
    User,
    News,
    GPTResponse
  }
  