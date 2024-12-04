import { Router } from "express";
import { authencation } from "../middleware/auth.js";
import { passUserId } from "../module/middleware/order.middleware.js";
import { addMiddleware, deleteMiddleware, getMiddleware } from "../middleware/query.middleware.js";
import { whislistModel } from "../module/whishlist.model.js";
import { excuteMiddleware } from "../middleware/excute.middleware.js";
import { filterMiddleware, pagnationMiddleware } from "../middleware/fetaure.middleware";

const whishlistRouter = Router({mergeParams:true})
whishlistRouter.post("/",authencation,passUserId,addMiddleware(whislistModel),excuteMiddleware)
whishlistRouter.get("/",getMiddleware(whislistModel),filterMiddleware("userId","id"),pagnationMiddleware(),excuteMiddleware)
whishlistRouter.delete("/:id",authencation,deleteMiddleware(whislistModel),filterMiddleware("id","_id"),excuteMiddleware)
whishlistRouter.delete("/",authencation,deleteMiddleware(whislistModel),excuteMiddleware)



export {whishlistRouter}