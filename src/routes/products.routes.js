import { Router } from "express";
import { addMiddleware, deleteMiddleware, getMiddleware, ubdateMiddleware } from "../middleware/query.middleware.js";
import { productModel } from "../module/product.model.js";
import { excuteMiddleware } from "../middleware/excute.middleware.js";
import { filterMiddleware, pagnationMiddleware } from "../middleware/fetaure.middleware.js";
import { upload } from "../utlis/multer/multer.utils.js";
import { productAddingexcution, productUbdatingexcution } from "../controll/product.control.js";
import { cathPreviewImage } from "../module/middleware/product.middleware.js";

const productRouter = Router();
productRouter.post("/",upload.array("images"),cathPreviewImage,addMiddleware(productModel),productAddingexcution)
productRouter.get("/",getMiddleware(productModel),pagnationMiddleware(),excuteMiddleware)
productRouter.put("/",ubdateMiddleware(productModel),excuteMiddleware)
productRouter.delete("/",deleteMiddleware(productModel),excuteMiddleware)
//use BY ID
productRouter.get("/:id",getMiddleware(productModel),filterMiddleware("_id","id") ,excuteMiddleware)
productRouter.put("/:id",upload.fields([{name : 'prevImage',maxCount:'1'},{name:'images',maxCount:'12'}]),productUbdatingexcution)
productRouter.delete("/:id",deleteMiddleware(productModel),filterMiddleware("_id","id"),excuteMiddleware)


export {productRouter}