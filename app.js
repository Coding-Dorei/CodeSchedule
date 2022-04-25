const express = require('express');
const router = require("./router/router")
const app = express();
const static = require('serve-static')
const path = require("path")
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const morgan = require('morgan')

app.set("view engine", "ejs")
app.set("views","./views")
app.use("/public",static(path.join(__dirname,"./public")))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(morgan("dev"))
app.use("/",router)

const DB_URL = process.env.DB_URL

app.listen(80,()=>{
    console.log("Server is running");
    mongoose.connect(DB_URL).then(()=>{
        console.log("DB connected")
    }).catch((err)=>{
        console.error(err)
    })
})