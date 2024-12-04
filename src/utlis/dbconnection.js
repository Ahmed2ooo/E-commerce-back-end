import mongoose from "mongoose";
import env from "dotenv"
env.config()

export const dbconnection = async()=>{
  const connection = mongoose.connect(process.env.MONGOOSE_URI)
  return connection
}