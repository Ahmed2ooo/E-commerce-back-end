import { Router } from "express";
import { productRouter } from "../routes/products.routes.js";
import { userRouter } from "../routes/user.routes.js";
import { cartRouter } from "../routes/cart.routes.js";

const v1Router = Router()
v1Router.use("/product",productRouter)
v1Router.use("/user",userRouter)
v1Router.use("/cart",cartRouter)
export{v1Router}