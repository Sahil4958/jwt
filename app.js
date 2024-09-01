const express = require("express");
require('dotenv').config()
const auth = require("./routes/auth");
const post = require("./routes/post");
const app = express()

const port = process.env.PORT
app.use(express.json())
app.use("/auth",auth);
app.use("/posts",post)

app.get("/",(req,res)=>{
    res.send("Hi I am Working")
})

app.listen(port,()=>{
 console.log(`Your app is running on http:///localhost:${port}`)
})
