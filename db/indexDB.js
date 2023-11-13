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

  const User = mongoose.model('User', userSchema);

  module.exports={
    User
  }
  