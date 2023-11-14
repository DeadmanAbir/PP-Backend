const mongoose = require('mongoose');
const express = require("express");
const linkedinRouter = require("./routes/linkedin");
const twitterRouter = require("./routes/twitter");
const generalRouter = require("./routes/general");
const cookieParser = require('cookie-parser');

const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(cookieParser()); // Middleware to parse cookies

app.use("", linkedinRouter);

mongoose.connect("mongodb+srv://sanjayduttyoyohoney:G3OQVIVmT92zRM1H@cluster0.jyox4xj.mongodb.net/Outerbase", { useNewUrlParser: true, useUnifiedTopology: true });

const checkUserIdMiddleware = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
  
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      // If the Bearer token is not present, you can handle unauthorized access
      return res.status(401).json({ error: 'Unauthorized access. Bearer token is missing.' });
    }
  
    const token = authorizationHeader.split(' ')[1];
  
    // Attach the userId (token) to the request object for use in subsequent route handlers
    req.userId = token;
  console.log("approved", token)
    // Continue to the next middleware or route handler
    next();
  };

app.use(checkUserIdMiddleware);
app.use("/general", generalRouter);
app.use("", twitterRouter);
app.listen(5000, () => {
  console.log("listening on 5000");
});
