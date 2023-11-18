const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL,
    pass: process.env.PASS,
  },
});
async function sendMail(to) {

 
    socialText = `Dear PostPilot user,\n We are excited to inform you that PostPilot has successfully shared a new post.\n Check your Linkedin to know more.\n Thank you for being a part of our community and for your continued support. We hope you find the content valuable and informative.\n
Stay tuned for more updates from PostPilot, and if you have any feedback or suggestions, feel free to reach out. We value your input.\n\nBest Regards,\nThe PostPilot Team`;
  
  const info = await transporter.sendMail({
    from: '"PostPilot!" <sanjayduttyoyohoney@gmail.com>', // sender address
    to: to, // list of receivers
    subject: "PostPilot Update: New Post Shared!", // Subject line
    text: socialText, // plain text body
    //   html: "<b>Hello world?</b>", // html body
  });
  //   res.json(info);
  console.log("Message sent: %s");

}

module.exports = { sendMail };