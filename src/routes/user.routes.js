import { Router } from "express";
import { askResetPassword, getMyAccounnData, logIn, resetPassword, signUp, ubdateAccountData, ubdatePassword, verifyAccount } from "../controll/user.control.js";
import { authencation } from "../middleware/auth.js";
import { cartRouter } from "./cart.routes.js";
import { orderRouter } from "./order.routes.js";
import { whishlistRouter } from "./whishlist.routes.js";
import { ratingAndReviewRoter } from "./ratingAndreview.routes.js";

const userRouter = Router({mergeParams:true});
userRouter.post("/signup",signUp)
userRouter.post("/login",logIn)
userRouter.get("/verify/:token",verifyAccount)
userRouter.put("/",authencation,ubdateAccountData)
userRouter.put("/password",authencation,ubdatePassword)
userRouter.get("/",authencation,getMyAccounnData) 
userRouter.post("/ask-for-reset-pasword",askResetPassword)
userRouter.put("/reset-password",authencation,resetPassword)

userRouter.use("/:id/cartitem",cartRouter)
userRouter.use("/:id/order",orderRouter)
userRouter.use("/:id/whishlist",whishlistRouter)
userRouter.use("/:id/rating",ratingAndReviewRoter)



export{userRouter}