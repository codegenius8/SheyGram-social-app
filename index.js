const express = require('express')
const DbConnection = require('./Database/db')
const userRoutes = require("./Routes/userRoutes")
const postRoutes = require("./Routes/postsRoutes")
const cors = require('cors')
const path = require("path")
const app = express()
const port = process.env.PORT || 5000
app.use(cors())
app.use(express.json({limit : '25mb'}))
// use medleware
app.use("/api/user/", userRoutes)
app.use("/api/posts/", postRoutes)
app.post("/",(req,res)=>{
   console.log("rrr",req)
})

app.use(express.static(path.resolve(__dirname, './client/build')));

app.get('*/',(req,res)=>{
   res.sendFile(path.resolve(__dirname,'./client/build/index.html'))
})

// if(process.env.NODE_ENV == "production"){
//    app.use('/', express.static('client/build'))
//    app.get('*',(req,res)=>{
//       res.sendFile(path.resolve(__dirname,'client/build/index.html'))
//    })
// } 

app.listen(port,()=>{
   console.log(`server running on ${port}`)
})
