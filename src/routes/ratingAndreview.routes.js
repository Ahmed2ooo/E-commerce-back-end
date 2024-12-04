import { Router } from "express"
import { authencation } from "../middleware/auth.js"
import { addRatingAndReview } from "../controll/rating.controll.js"
import { excuteMiddleware } from "../middleware/excute.middleware.js"
import { ratingAndReviewModel } from "../module/ratingAndreview.model.js"
import { deleteMiddleware, getMiddleware } from "../middleware/query.middleware.js"
import { filterMiddleware, pagnationMiddleware } from "../middleware/fetaure.middleware.js"

const ratingAndReviewRoter = Router({mergeParams:true})

ratingAndReviewRoter.post("/",authencation,addRatingAndReview)
ratingAndReviewRoter.delete("/",authencation,deleteMiddleware(ratingAndReviewModel),excuteMiddleware)
ratingAndReviewRoter.delete("/:id",authencation,deleteMiddleware(ratingAndReviewModel),filterMiddleware("id","_id"),excuteMiddleware)
ratingAndReviewRoter.get("/",getMiddleware(ratingAndReviewModel),filterMiddleware("userId","id"),pagnationMiddleware(),excuteMiddleware)

export{ratingAndReviewRoter}