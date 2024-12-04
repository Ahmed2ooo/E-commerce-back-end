import jwt from "jsonwebtoken";
import { Errorhandler, sendError } from "../service/errorHandler.service.js";
import dotenv from "dotenv"
dotenv.config

export const authencation = Errorhandler(async(req,res,next)=>{
    const token = req.headers.token
    if(!token)throw new sendError(400,"token is invalid")
    

    await jwt.verify(token,process.env.SECRET_KEY,async(error,decodedToken)=>{
        if(error)throw new sendError(400,"token is invalid")
            req.decodedToken= decodedToken
            next();
    });
})


export const authorization = (Role)=>{
    return Errorhandler(async(req,res,next)=>{
        const{role}= req.decodedToken
        if(role===Role){
            next();
        }else{
            throw new sendError(401,"your not authraized")
        }
    })
}
