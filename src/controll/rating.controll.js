import { productModel } from "../module/product.model.js";
import { ratingAndReviewModel } from "../module/ratingAndreview.model.js";
import { Errorhandler } from "../service/errorHandler.service.js";

export const addRatingAndReview = Errorhandler(async(req,res)=>{
    const{rating,review,productId}=req.body
    const { _id: userId } = req.decodedToken;
     
    const book = await productModel.findById(productId);
    if(!book)throw new SendError(400,"product not found")
  
      const newRatingAndReview = await ratingAndReviewModel.create({rating,review,productId,addedBy:userId})
      if(!newRatingAndReview)throw new SendError(400,"can not Rating and Review")
      res.status(200).json({
       message:"sucesses!",
       data: newRatingAndReview
      })
  })