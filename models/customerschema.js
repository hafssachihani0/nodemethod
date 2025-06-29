const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const userSchema=new Schema({

    firstname:String,
    lastname:String,
    email:String,
    phonenumber:Number,
    age:Number,
    country:String,
    gender:String


},{timestamps:true})


const User=mongoose.model("customer",userSchema)
module.exports=User;