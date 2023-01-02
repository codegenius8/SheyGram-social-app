const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/sheyGram",{useUnifiedTopology : true , useNewUrlParser : true})
const connection = mongoose.connection

connection.on('connected',()=>{
    console.log("mongoDb connection successful")
})
//error handler
connection.on('error',()=>{
    console.log("error in mongoDb connection")
})

module.exports = mongoose
