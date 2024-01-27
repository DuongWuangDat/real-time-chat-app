const express = require('express')
const bcrypt = require('bcrypt')
const route = express.Router()
const hashMethods = require('../pkg/authorized/authorization.js')
const userModel = require('../model/user.js')
const authenMethod = require('../pkg/authorized/authentication.js')
const validator = require('validator')

route.get("/ping", (req,res)=>{
    res.json({
        message: "pong"
    })
})
route.post("/register", async (req,res)=>{
    const user = new userModel(req.body)
    const existUser = await userModel.findOne({email: user.email})
    if(existUser) {
        return res.status(400).json({
            message: "Existed user"
        })
    }
    if(!validator.isEmail(user.email)){
        return res.status(400).json({
            message: "Invalid email"
        })
    }
    user.password= await hashMethods.hashPassword(user.password)
    user.save().then(result => {
        res.json({
            message: "Register successfully",
            data: result
        })
    }).catch(err =>{
        res.status(404).json({
            message: "Error occur"
        })
    })
})
route.post('/login',async (req,res)=>{
    const {email, password} = req.body
    const existUser = await userModel.findOne({email:email})
    if(!existUser){
        return res.status(500).json({
            message: "Invalid email"
        })
    }
    const isValidPassword = await hashMethods.comparePassword(existUser.password,password)
    if(!isValidPassword){
        return res.status(500).json({
            message: "Unauthorized"
        })
    }
    const token = await authenMethod.generateToken(existUser._id)
    return res.json({
        token: token
    })
})
route.post('/verify', async (req,res)=>{
    const token = authenMethod.getHeader(req)
    const decode = await authenMethod.tokenVerify(token)
    return res.json({
        data: decode
    })
})
module.exports= route