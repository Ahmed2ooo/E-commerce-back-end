import { Router } from "express";
import { authencation } from "../middleware/auth.js";
import { passUserIdmiddleware } from "../middleware/cart.middleware.js";
import { addMiddleware, deleteMiddleware, getMiddleware, ubdateMiddleware } from "../middleware/query.middleware.js";
import { cartModel } from "../module/cart.model.js";
import { excuteMiddleware } from "../middleware/excute.middleware.js";
import { filterMiddleware, pagnationMiddleware } from "../middleware/fetaure.middleware.js";


const cartRouter = Router({mergeParams:true});

cartRouter.post("/",authencation,passUserIdmiddleware,addMiddleware(cartModel),excuteMiddleware)
cartRouter.put("/:id",authencation,ubdateMiddleware(cartModel),filterMiddleware("_id","id"),excuteMiddleware)
cartRouter.delete("/:id",authencation,deleteMiddleware(cartModel),filterMiddleware("_id","id"),excuteMiddleware)
cartRouter.delete("/",authencation,deleteMiddleware(cartModel),excuteMiddleware)

cartRouter.get("/",getMiddleware(cartModel),filterMiddleware("userId","id"),pagnationMiddleware(),excuteMiddleware)




export{cartRouter}