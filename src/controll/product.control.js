import { imageModel } from "../module/image.model.js"
import { productModel } from "../module/product.model.js"
import { Errorhandler, sendError } from "../service/errorHandler.service.js"

export const productAddingexcution = Errorhandler(async(req,res)=>{
    if(req.files){
        let productImagepath = []
        for(let i=0;i<req.files.length;i++){
            if(i!==0){
                productImagepath.push(req.files[i].path)

            }
        }
        const product =await req.Query
        if(!product)throw new sendError(400,"failed to adding product")
         const result = await imageModel.create({path:productImagepath,productId:product._id})
        if(!result)throw new sendError(400,"failed to adding product Image")
         res.status(201).json({
        message: "product add sucesses",
        data:product,
        Images:result
        })
    }

})

export const productUbdatingexcution = Errorhandler(async(req,res)=>{
   if(req.files.prevImage){
    req.body.minPrevImage=req.files.prevImage[0].path
   }
   if(req.files.images){
    let productImagepath = []
    for(let i=0;i<req.files.images.length;i++){
         productImagepath.push(req.files.images[i].path)
        }
        const addProductImage = await imageModel.updateOne({productId:req.params.id},{path:productImagepath})
        if(!addProductImage)throw new sendError(400,"failed to adding product image")
        }
        
        const result = await productModel.updateOne({productId:req.params.id},req.body)
        if(!result)throw new sendError("failed to adding product ")
         res.status(201).json({
        message: " sucesses",
        data:req.body,
        })
    
   
})