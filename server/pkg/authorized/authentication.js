const jwt = require('jsonwebtoken')
require('dotenv').config()
const generateToken= async (userID) =>{
    return await jwt.sign({userID},process.env.SECRET_KEY,{expiresIn: "1d", algorithm: "HS256"})
}
const tokenVerify = async (token) =>{
    return await jwt.verify(token, process.env.SECRET_KEY)
}
const getHeader = (req)=>{
    return req.headers.authorization.split(' ')[1]
}
module.exports = {generateToken, tokenVerify,getHeader}