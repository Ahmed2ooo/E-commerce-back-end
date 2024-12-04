import { Router } from "express";
import { makeOrder } from "../controll/order.controll.js";
import { authencation } from "../middleware/auth.js";
import { excuteMiddleware } from "../middleware/excute.middleware.js";
import { filterMiddleware, pagnationMiddleware } from "../middleware/fetaure.middleware.js";
import { getMiddleware } from "../middleware/query.middleware.js";
import { passUserId } from "../module/middleware/order.middleware.js";
import { orderModel } from "../module/order.model.js";



const orderRouter = Router({mergeParams:true});

orderRouter.post("/",authencation,passUserId,makeOrder)
orderRouter.get("/",getMiddleware(orderModel),filterMiddleware("userId","id"),pagnationMiddleware(),excuteMiddleware)

export {orderRouter} 