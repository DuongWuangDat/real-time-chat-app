const express = require('express')
const route = express.Router()

route.get("/ping", (req,res)=>{
    res.json({
        message: "pong"
    })
})
module.exports= route