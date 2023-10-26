const axios = require("axios");
const {User}=require("../db/indexDB")


const getAuthorizationUrl = () => {
  const redirectUri = encodeURI(`http://localhost:3000/linkedin/callback`);

  console.log(process.env.BACKEND_URL, process.env.LINKEDIN_CLIENT_ID);
  return `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77avf45xmh4igg&redirect_uri=${redirectUri}&state=foobar&scope=profile%20email%20w_member_social%20openid`;
};

const getAccessToken = async (code) => {
  const redirectUri = encodeURI(`http://localhost:3000/linkedin/callback`);
  const response = await axios.post(
    "https://www.linkedin.com/oauth/v2/accessToken",
    null,
    {
      params: {
        grant_type: "authorization_code",
        code,
        client_id: "77avf45xmh4igg",
        client_secret: "pnQ8zxrFTLEA7Kzt",
        redirect_uri: redirectUri,
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  console.log(response.data.access_token);
  return response.data.access_token;
};

const saveCredentialsToMongo = async (accessToken, uid) => {
  try {
    const response = await axios.get("https://api.linkedin.com/v2/userinfo", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Handle the response here
    console.log(response.data);
    const { sub, name, email, picture } = response.data;
    // const { error } = await superbase
    //   .from("linkedin")
    //   .insert({ uid: uid, linkedinsub: sub, linkedinaccesstoken: accessToken });
    const filter={name: name};
    const updates={linkedin:[{sub, name}]};
   const update=await User.findOneAndUpdate(filter,updates);
    console.log(error, "saving to linkedin db");
  } catch (error) {
    // Handle errors, including the one you mentioned
    console.error("Error:", error.response?.data || error.message);
  }
};
// const linkedinPost = async (postContent, uid, socialMedia) => {
//   try {
//     const postData = await run(postContent, socialMedia);
//     const { data } = await superbase
//       .from("linkedin")
//       .select("linkedinaccesstoken, linkedinsub")
//       .eq("uid", uid);
//     const accessToken = data[0].linkedinaccesstoken;
//     const profileId = data[0].linkedinsub;
//     try {
//       const response = await axios.post(
//         "https://api.linkedin.com/v2/ugcPosts",
//         {
//           author: `urn:li:person:${profileId}`,
//           lifecycleState: "PUBLISHED",
//           specificContent: {
//             "com.linkedin.ugc.ShareContent": {
//               shareCommentary: {
//                 text: postData,
//               },
//               shareMediaCategory: "NONE",
//             },
//           },
//           visibility: {
//             "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
//           },
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );
//       console.log(response.data);
//       return response.data;
//     } catch (err) {
//       console.error(err);
//       return null;
//     }
//   } catch (err) {
//     console.error(err);
//     return null;
//   }
// };
module.exports = {
  getAuthorizationUrl,
  getAccessToken,
  saveCredentialsToMongo,
//   linkedinPost,
};
