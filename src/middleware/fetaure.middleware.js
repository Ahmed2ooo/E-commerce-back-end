export const filterMiddleware = (filedName,paramsName)=>{
   return(req,res,next)=>{
    req.Query = req.Query.where({[filedName]:req.params[paramsName]})
    next();
   }
}

export const pagnationMiddleware =()=>{
    return async(req,res,next)=>{
        const{page,limit}=req.query;
        let cuurentPage = page || 1;
        let perPage = limit || 10;
        const skip = (cuurentPage-1)*perPage;
        const modelToken = req.Query.model;
        const totalRows = await modelToken.countDocuments()
        const noOfPage= Math.ceil(totalRows/perPage)
        req.Query = req.Query.skip(skip).limit(perPage)
        const hasNext =cuurentPage < noOfPage;
        const prevPage = cuurentPage > 1
        const meta = {
            hasNext,
            prevPage,
            cuurentPage,
            noOfPage,
            totalRows,
            limit,
            page:perPage
        }
        req.meta = meta
        next()
    }
}