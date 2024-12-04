import mongoose from "mongoose";

const userSchem = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
    },
    password:{
        type:String,
       // match:/^[a-zA-Z0-9!@#$%^&*]{6,16}$/,
        required: true
    },
    adress:{
        country:{
            type:String,

        },
        city:{
            type:String,
        },
    },
    verified:{
        type:Boolean,
        default:false
    },
    
    
},{timestamps:true})

export const userModel = mongoose.model("User",userSchem)