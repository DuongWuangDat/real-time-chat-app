const express = require('express')
const userController = require('../controller/user_controller.js')
const route = express.Router()

route.get("/ping", (req,res)=>{
    res.json({
        message: "pong"
    })
})
route.post("/register", userController.register)
route.post('/login', userController.login)
route.post('/verify', userController.verify)
module.exports= route