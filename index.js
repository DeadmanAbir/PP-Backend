const mongoose = require('mongoose');
const express = require("express");
const linkedinRouter=require("./routes/linkedin");
const generalRouter=require("./routes/general");
const app=express()
const cors = require('cors')
app.use(cors());
app.use(express.json());
app.use("/general", generalRouter);
app.use("",linkedinRouter);
mongoose.connect("mongodb+srv://sanjayduttyoyohoney:G3OQVIVmT92zRM1H@cluster0.jyox4xj.mongodb.net/Outerbase", { useNewUrlParser: true, useUnifiedTopology: true});


app.listen(5000, ()=>{
    console.log("listening on 5000")
})