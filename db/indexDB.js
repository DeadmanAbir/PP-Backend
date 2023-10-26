const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: String,
    uid: String,
    email: String,
    twitter: [{
        name: String,
        refreshToken: String,
        accessToken: String,
        newsType: String,
        schedule: String,
      }],
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
  