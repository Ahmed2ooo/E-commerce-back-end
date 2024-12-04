import { cartModel } from "../module/cart.model.js"
import { orderModel } from "../module/order.model.js"
import { Errorhandler, sendError } from "../service/errorHandler.service.js"

export const makeOrder = Errorhandler(async(req,res)=>{
    const {id}=req.params
    let orderItems = []
    let totalPrice = 0
    let totalAmount = 0
    const findUserCartItem = await cartModel.find({userId:id}).populate("productId")
    if(!findUserCartItem)throw new sendError(400,"Error in finding user cart item")
      findUserCartItem.map((item)=>{
      orderItems.push({
          bookId:item.productId?._id,
          count:item.count
      })
      totalPrice+=item.productId.price*item.count;
      totalAmount+=item.count
      })
      req.body.orderItems = orderItems;
      req.body.totalAmount=totalAmount
      req.body.totalPrice=totalPrice
  
      const result = await orderModel.create(req.body)
      await cartModel.deleteMany({userId:id})
      if(!result)throw new sendError(400,"Error in making order")
      res.status(200).json({
      message:"sucesses",
      data:result
  })
  
  })