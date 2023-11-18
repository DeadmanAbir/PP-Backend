const axios = require("axios");
const {User}=require("../db/indexDB")

const dotenv = require("dotenv").config();

const getAuthorizationUrl = () => {
  const redirectUri = encodeURI(`${process.env.BACKEND_URL}/linkedin/callback`);

  return `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77fc7ioh2s1s0c&redirect_uri=${redirectUri}&state=foobar&scope=profile%20email%20w_member_social%20openid`;
};


const getAccessToken = async (code) => {
  const redirectUri = encodeURI(`${process.env.BACKEND_URL}/linkedin/callback`);
  const response = await axios.post(
    "https://www.linkedin.com/oauth/v2/accessToken",
    null,
    {
      params: {
        grant_type: "authorization_code",
        code,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: redirectUri,
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return response.data.access_token;
};

const saveCredentialsToMongo = async (accessToken, userId) => {
  try {
    const response = await axios.get("https://api.linkedin.com/v2/userinfo", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const { sub, name, email, picture } = response.data;
  

   const user= await User.findOne({ user: userId});
   const newArray=[{sub, accessToken,email,  name: ""}];

  for(let i =0; i<user.linkedin.length; i++) {
    newArray.push(user.linkedin[i]);
  }

   const filter={user: userId};
    const updates={linkedin:newArray};
    const update=await User.findOneAndUpdate(filter,updates);
    console.log( "saving to linkedin db");
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
};
const linkedinPost = async (postContent, userId, name, userArray) => {
  try {
    
    let accessToken; 
    let profileId ;
    for(let i=0; i<userArray.length; i++) {
      if(userArray[i].name==name){
        accessToken=userArray[i].accessToken;
        profileId=userArray[i].sub;
      }
    }
   
    try {
      const response = await axios.post(
        "https://api.linkedin.com/v2/ugcPosts",
        {
          author: `urn:li:person:${profileId}`,
          lifecycleState: "PUBLISHED",
          specificContent: {
            "com.linkedin.ugc.ShareContent": {
              shareCommentary: {
                text: postContent,
              },
              shareMediaCategory: "NONE",
            },
          },
          visibility: {
            "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
          },
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
    
    }
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  getAuthorizationUrl,
  getAccessToken,
  saveCredentialsToMongo,
   linkedinPost,
};
