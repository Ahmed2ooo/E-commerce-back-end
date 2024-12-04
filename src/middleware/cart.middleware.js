import { Errorhandler } from "../service/errorHandler.service.js";


export const passUserIdmiddleware = Errorhandler(async(req,res,next)=>{
   const {_id} = req.decodedToken
   req.body.userId =_id;
   next(); 
   
})