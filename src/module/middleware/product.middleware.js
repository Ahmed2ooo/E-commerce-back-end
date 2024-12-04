import { Errorhandler, sendError } from "../../service/errorHandler.service.js";


export const cathPreviewImage = Errorhandler((req,res,next)=>{
    if(req.files){
        req.body.minPrevImage=req.files[0].path;
        next();
    }
    else{
        throw new sendError(400,"preview image is required")
        
    }
}
   
)