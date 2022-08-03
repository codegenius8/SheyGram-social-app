const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
   username :   { type : String, required: true},
   password : {type : String ,required : true},
   privateAccount : { type : Boolean,required : false ,default : false},

   followers : [{type : mongoose.Schema.Types.ObjectId ,ref : 'Users'}],
   following : [{type : mongoose.Schema.Types.ObjectId ,ref : 'Users'}],
   profilepicUrl : {type : String ,required : false , default : ""},
   bio : {type : String ,required : false ,default : ''},
   savedPosts : [],
   archeivedPost : []
},{
    timestamps : true
})

module.exports =  mongoose.model("Users",userSchema)