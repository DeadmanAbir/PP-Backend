const dotenv = require("dotenv").config();


const updateGPTResponse=async ()=>{
    const startupResponse=await fetch(process.env.STARTUP_URL,{
        method: "POST",
    })
    const fundingResponse=await fetch(process.env.FUNDING_URL,{
        method: "POST",
    })
    const techResponse=await fetch(process.env.TECH_URL,{
        method: "POST",
    })
}

module.exports ={
    updateGPTResponse
}




