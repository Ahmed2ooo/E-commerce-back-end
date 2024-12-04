import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required : true
  },
  
   description:{
        type:String,
        required: true
    },
    minPrevImage:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    ratingAvg:{
        type:Number,
        default:0
      },


},{timestamps:true})
export const productModel = mongoose.model("Product",productSchema)
