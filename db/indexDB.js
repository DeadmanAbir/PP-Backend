const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    user: String,
 
    linkedin: [{
        name: String,
        sub: String,
        accessToken: String,
        newsType: String,
        schedule: String,
      }]
  });

  const newsSchema = new mongoose.Schema({
    fundingNews: String,
    techNews: String,
    startupNews: String,
    
  });

  const User = mongoose.model('User', userSchema);
const News=mongoose.model("News", newsSchema);
  module.exports={
    User,
    News
  }
  