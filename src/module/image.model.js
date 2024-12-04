import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  path:[{
    type : String,
    required : true
  }],
  productId:{
    type : mongoose.Schema.Types.ObjectId,
    ref : "Product",
    required : true
  },
 
},{timestamps:true})

export const imageModel= mongoose.model("Image",imageSchema)