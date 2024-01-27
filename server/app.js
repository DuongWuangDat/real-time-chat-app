const express =require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const app = express()
const userRoute = require('./route/user_route.js')
require("dotenv").config()
const port = process.env.PORT

//-------Connect database----------//
mongoose.connect(process.env.ATLAS_URI).then(()=> {
    console.log("MongoDB is connected sucessfully")
    app.listen(port,()=>{
        console.log("Listen and run at port:"+ port )
    })
}).catch(err=> {
    console.log(err)
})
//-------Connect database----------//

app.use(morgan('dev'))
app.use(express.json())
app.use(userRoute)